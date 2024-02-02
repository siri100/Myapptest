
import { BasePage } from './base.page.js';
import testData from "../testData/testData.json" assert { type: "json" };
import { driver } from '@wdio/globals';
import randomize from 'randomatic';
import superagent from 'superagent';


export class JuiceElement {
    static Element(locator) {

        return new BasePage(locator);
    }
}

export class JuiceAPI extends JuiceElement {


    static async loginViaAPI() {
        try {
            const res = await superagent.post(testData.APIEndPoints.loginAPI).send({ email: testData.loginDetails.email, password: testData.loginDetails.password });
            return [res.status, res.body.authentication.token]

        } catch (err) {
            console.error(err);
        }
    }

    static async negativeLoginViaAPI() {
        try {
            const response = await superagent.post(testData.APIEndPoints.loginAPI).send({ email: testData.loginDetails.email, password: 'admin12' });
            return response.status
        } catch (error) {
            console.error(error.message);
            return error.message
        }

    }

    static async registerUserViaAPI() {
        try {
            let email = `${randomize('a', 5)}@gmail.com`;
            const res = await superagent.post(testData.APIEndPoints.registerUserAPI).send({ "email": `${email}`, "password": "test123", "passwordRepeat": "test123", "securityQuestion": { "id": 1, "question": "Your eldest siblings middle name?", "createdAt": "2024-02-01T13:21:32.878Z", "updatedAt": "2024-02-01T13:21:32.878Z" }, "securityAnswer": "test" });
            return [res.status, res.body.status,email]

        } catch (err) {
            console.error(err);
        }
    }

    static async negativeRegisterUserViaAPI(email) {
        try {
            await driver.pause(3000)
            const res = await superagent.post(testData.APIEndPoints.registerUserAPI).send({ "email": `${email}`, "password": "test123", "passwordRepeat": "test1", "securityQuestion": { "id": 1, "question": "Your eldest siblings middle name?", "createdAt": "2024-02-01T13:21:32.878Z", "updatedAt": "2024-02-01T13:21:32.878Z" }, "securityAnswer": "test" });
            return [res.status, res.body.message]
        } catch (error) {
            console.error(error.message)
            return error.message
        }

    }

    static async getCaptcha() {
        try {
            const res = await superagent.get(testData.APIEndPoints.getCaptchaAPI);
            return [res.status, res.body.captchaId, res.body.answer]

        } catch (err) {
            console.error(err);
        }
    }

    static async customerFeedBackViaAPI(captchaID, captchaAnswer) {
        try {
            const res = await superagent.post(testData.APIEndPoints.customerFeedbackAPI).send({ "UserId": 1, "captchaId": captchaID, "captcha": captchaAnswer, "comment": "Tets (***in@juice-sh.op)", "rating": 3 });
            return [res.status, res.body.status]

        } catch (err) {
            console.error(err);
        }
    }

    static async purchaseViaAPI(bearerToken) {
        try {
            const res = await superagent.post(testData.APIEndPoints.checkoutAPI).set('Authorization', 'Bearer ' + bearerToken).send({ "couponData": "bnVsbA==", "orderDetails": { "paymentId": "3", "addressId": "3", "deliveryMethodId": "1" } });
            return [res.status, res.body.orderConfirmation]

        } catch (err) {
            console.error(err);
        }
    }

    static async addItemsToBasketAPI(bearerToken) {
        try {
            const res = await superagent.post(testData.APIEndPoints.addItemsAPI).set('Authorization', 'Bearer ' + bearerToken).send({ "ProductId": 1, "BasketId": "1", "quantity": 1 });
            return [res.status, res.body.status, res.body.data.id]

        } catch (err) {
            console.error(err);
        }
    }

    static async deleteItemsFromBasketAPI(bearerToken, addedItemId) {
        try {
            const res = await superagent.delete(`${testData.APIEndPoints.addItemsAPI}/${addedItemId}`).set('Authorization', 'Bearer ' + bearerToken).send({ "ProductId": 1, "BasketId": "1", "quantity": 1 });
            return [res.status, res.body.status]

        } catch (err) {
            console.error(err);
        }
    }

}


