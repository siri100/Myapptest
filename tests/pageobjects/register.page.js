
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

export class JuiceRegisterPage extends JuiceElement {

    //User Register
    static accountIcon() { return this.Element(`//button[@id='navbarAccount']`) };
    static dismissBtn() { return this.Element(`//span[contains(text(),'Dismiss')]`) };
    static meWantBtn() { return this.Element(`//a[contains(text(),'Me want it!')]`) };
    static loginBtn() { return this.Element(`//button[@id='navbarLoginButton']`) };
    static notCustLink() { return this.Element(`//a[normalize-space()='Not yet a customer?']`) };
    static emailInput() { return this.Element(`//input[@id='emailControl']`) };
    static passwordInput() { return this.Element(`//input[@id='passwordControl']`) };
    static repeatPasswordInput() { return this.Element(`//input[@id='repeatPasswordControl']`) };
    static securityQuestion() { return this.Element(`//mat-select[@name='securityQuestion']`) };
    static securityQuestionDropDown() { return this.Element(`//span[normalize-space()='Your eldest siblings middle name?']`) };
    static securityAnswerControl() { return this.Element(`//input[@id='securityAnswerControl']`) };
    static userRegisterErrorMsg() { return this.Element(`//div[@class='error']`) };
    static registerButton() { return this.Element(`//button[@id='registerButton']//span[@class='mat-button-wrapper']`) };
    static registerSuccessfullMsg() { return this.Element(`//span[contains(text(),'Registration completed successfully. You can now log in.')]`) };

    //Login 
    static emailInputField() { return this.Element(`//input[@id='email']`) };
    static invalidUserNamePasswordMsg() { return this.Element(`//div[@class='error ng-star-inserted']`) };
    static passwordInputField() { return this.Element(`//input[@id='password']`) };
    static loginBtn2() { return this.Element(`//button[@id='loginButton']//span[@class='mat-button-wrapper']`) };
    static homePageText() { return this.Element(`//div[contains(text(),'All Products')]`) };



    static async resgisterNewUser() {
        await this.emailInput().waitForDisplayed();
        await this.emailInput().clearValue();
        await this.emailInput().addValue(`${randomize('a', 5)}@gmail.com`);
        await this.passwordInput().addValue(testData.newUserDetails.password);
        await this.repeatPasswordInput().addValue(testData.newUserDetails.password);
        await this.securityAnswerControl().addValue(testData.newUserDetails.securityAnswer);
        await this.registerButton().waitForEnabled();
        await this.registerButton().click();
        await this.registerSuccessfullMsg().waitForDisplayed();
        return await this.registerSuccessfullMsg().getVisibleText();


    }

    static async negativeRegisterUser() {
        await driver.url(testData.base_url);
        await driver.maximizeWindow();
        await this.dismissBtn().waitForDisplayed();
        await this.dismissBtn().click();
        await this.meWantBtn().waitForDisplayed();
        await this.meWantBtn().click();
        await this.accountIcon().waitForDisplayed();
        await this.accountIcon().click();
        await this.loginBtn().waitForDisplayed();
        await this.loginBtn().click();
        await driver.pause(2000)
        await driver.refresh();
        await this.notCustLink().waitForDisplayed();
        await this.notCustLink().click();
        await this.emailInput().waitForDisplayed();
        await this.emailInput().addValue(testData.loginDetails.email);
        await this.passwordInput().addValue(testData.newUserDetails.password);
        await this.repeatPasswordInput().addValue(testData.newUserDetails.password);
        await this.securityQuestion().click();
        await this.securityQuestionDropDown().waitForDisplayed();
        await this.securityQuestionDropDown().click();
        await this.securityAnswerControl().addValue(testData.newUserDetails.securityAnswer);
        await this.registerButton().waitForEnabled();
        await this.registerButton().click();
        await this.userRegisterErrorMsg().waitForDisplayed();
        return await this.userRegisterErrorMsg().getVisibleText();
    }

    static async validateLogin() {

        await this.emailInputField().waitForDisplayed();
        await this.emailInputField().clearValue();
        await this.emailInputField().addValue(testData.loginDetails.email);
        await this.passwordInputField().clearValue();
        await this.passwordInputField().addValue(testData.loginDetails.password);
        await this.loginBtn2().waitForEnabled();
        await this.loginBtn2().click();
        await this.homePageText().waitForDisplayed();
        return await this.homePageText().getVisibleText();

    }

    static async loginViaAPI() {
        try {
            const res = await superagent.post(testData.APIEndPoints.loginAPI).send({ email: testData.loginDetails.email, password: testData.loginDetails.password });
            return [res.status,res.body.authentication.token]

        } catch (err) {
            console.error(err);
        }
    }

    static async registerUserViaAPI() {
        try {
            const res = await superagent.post(testData.APIEndPoints.registerUserAPI).send({"email":`${randomize('a', 5)}@gmail.com`,"password":"test123","passwordRepeat":"test123","securityQuestion":{"id":1,"question":"Your eldest siblings middle name?","createdAt":"2024-02-01T13:21:32.878Z","updatedAt":"2024-02-01T13:21:32.878Z"},"securityAnswer":"test"});
            return [res.status,res.body.status]

        } catch (err) {
            console.error(err);
        }
    }

    static async getCaptcha() {
        try {
            const res = await superagent.get(testData.APIEndPoints.getCaptchaAPI);
            return [res.status,res.body.captchaId,res.body.answer]

        } catch (err) {
            console.error(err);
        }
    }

    static async customerFeedBackViaAPI(captchaID,captchaAnswer) {
        try {
            const res = await superagent.post(testData.APIEndPoints.customerFeedbackAPI).send({"UserId":1,"captchaId":captchaID,"captcha":captchaAnswer,"comment":"Tets (***in@juice-sh.op)","rating":3});
            return [res.status,res.body.status]

        } catch (err) {
            console.error(err);
        }
    }
    
    static async purchaseViaAPI(bearerToken) {
        try {
            const res = await superagent.post(testData.APIEndPoints.checkoutAPI).set('Authorization', 'Bearer ' + bearerToken).send({"couponData":"bnVsbA==","orderDetails":{"paymentId":"3","addressId":"3","deliveryMethodId":"1"}});
            return [res.status,res.body.orderConfirmation]

        } catch (err) {
            console.error(err);
        }
    }

    static async negativeLogin() {

        await this.emailInputField().waitForDisplayed();
        await this.emailInputField().addValue('ramdom@error.com');
        await this.passwordInputField().addValue(testData.loginDetails.password);
        await this.loginBtn2().waitForEnabled();
        await this.loginBtn2().click();
        await this.invalidUserNamePasswordMsg().waitForDisplayed();
        return await this.invalidUserNamePasswordMsg().getVisibleText();
    }


}


