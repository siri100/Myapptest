import { JuiceHomepage } from '../pageobjects/home.page.js';
import { JuiceRegisterPage } from '../pageobjects/register.page.js';
import { JuiceCustomerFeedbackpage } from '../pageobjects/customer.feedback.page.js';
import { JuiceAPI } from '../pageobjects/api.page.js';
import { assert, expect } from 'chai';
import testData from "../testData/testData.json" assert { type: "json" };


describe('Juice Shop Software Test Suite', () => {


    it('Juice Shop user registration Test', async () => {

        let userRegisterErrorMsg = await JuiceRegisterPage.negativeRegisterUser();
        expect(userRegisterErrorMsg).to.be.equal('Email must be unique')

        let registerSuccessfullMsg = await JuiceRegisterPage.resgisterNewUser();
        expect(registerSuccessfullMsg).to.be.equal('Registration completed successfully. You can now log in.')
    })
    it('Juice Shop Login Test', async () => {

        let invalidUserNamePasswordMsg = await JuiceRegisterPage.negativeLogin();
        expect(invalidUserNamePasswordMsg).to.be.equal('Invalid email or password.')

        let homePageText = await JuiceRegisterPage.validateLogin();
        expect(homePageText).to.be.equal('All Products')
    })
    it('Juice Shop Add Remove Items Test', async () => {

        let [juiceAddedToBasketMsg,appleJuiceItemBasketText] = await JuiceHomepage.validateAddRemoveItems();
        expect(appleJuiceItemBasketText).to.be.contains('Apple Juice (1000ml)')
        expect(juiceAddedToBasketMsg).to.be.contains('Apple Juice (1000ml)')
    })  
    it('Juice Shop complete purchase flow Test', async () => {

        let purchaseSuccessMsg = await JuiceHomepage.validatePurchaseFlow();
        expect(purchaseSuccessMsg).to.be.contains('Thank you for your purchase!')

    })  
    it('Juice Shop customer feedback flow Test', async () => {

        let custFeebackSuccessMsg = await JuiceCustomerFeedbackpage.validateCustomerFeedback();
        expect(custFeebackSuccessMsg).to.be.contains('Thank you for your feedback.')

    })  

    it('Juice Shop Login API Test', async () => {

        let negativeLoginViaAPIStatus = await JuiceAPI.negativeLoginViaAPI();
        console.log(negativeLoginViaAPIStatus)
        expect(negativeLoginViaAPIStatus).to.be.equal('Unauthorized');

        let [loginViaAPIStatusCode, authenticationToken] = await JuiceAPI.loginViaAPI();
        expect(loginViaAPIStatusCode).to.be.equal(200)
    })

    it('Juice Shop user register API Test', async () => {

        let [registerUserViaAPIStatusCode, registerUserViaAPIStatusMsg,email] = await JuiceAPI.registerUserViaAPI();
        expect(registerUserViaAPIStatusCode).to.be.equal(201)
        expect(registerUserViaAPIStatusMsg).to.be.equal('success')

        let negativeRegisterUserViaAPIStatus = await JuiceAPI.negativeRegisterUserViaAPI(email);
        expect(negativeRegisterUserViaAPIStatus).to.be.equal('Bad Request')
    })
    it('Juice Shop customer feedback API Test', async () => {

        let [getCaptchaStatusCode, captchaID, captchaAnswer] = await JuiceAPI.getCaptcha();
        expect(getCaptchaStatusCode).to.be.equal(200)

        let [customerFeedBackViaAPIStatusCode, customerFeedBackViaAPIStatusMsg] = await JuiceAPI.customerFeedBackViaAPI(captchaID, captchaAnswer);
        expect(customerFeedBackViaAPIStatusCode).to.be.equal(201)
        expect(customerFeedBackViaAPIStatusMsg).to.be.equal('success')
    })
    it('Juice Shop purchase API Test', async () => {


        let [loginViaAPIStatusCode, authenticationToken] = await JuiceAPI.loginViaAPI();
        expect(loginViaAPIStatusCode).to.be.equal(200)

        let [purchaseViaAPIStatusCode, purchaseViaAPIOrderID] = await JuiceAPI.purchaseViaAPI(authenticationToken);
        expect(purchaseViaAPIStatusCode).to.be.equal(200)
       
    })

    it('Juice Shop add/delete items to basket API Test', async () => {

        let [loginViaAPIStatusCode, authenticationToken] = await JuiceAPI.loginViaAPI();
        await JuiceAPI.purchaseViaAPI(authenticationToken);

        let [addItemsToBasketAPIStatusCode, addItemsToBasketAPIStatusMsg,addedItemId] = await JuiceAPI.addItemsToBasketAPI(authenticationToken);
        expect(addItemsToBasketAPIStatusCode).to.be.equal(200);
        expect(addItemsToBasketAPIStatusMsg).to.be.equal('success');

        let [deleteItemsFromBasketAPIStatusCode, deleteItemsFromBasketAPIStatusMsg] = await JuiceAPI.deleteItemsFromBasketAPI(authenticationToken,addedItemId);
        expect(deleteItemsFromBasketAPIStatusCode).to.be.equal(200);
        expect(deleteItemsFromBasketAPIStatusMsg).to.be.equal('success');
       
    })


});


