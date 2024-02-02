
import { BasePage } from './base.page.js';
import testData from "../testData/testData.json" assert { type: "json" };
import { driver } from '@wdio/globals';
import randomize from 'randomatic';


export class JuiceElement {
    static Element(locator) {

        return new BasePage(locator);
    }
}

export class JuiceHomepage extends JuiceElement {

    //Add remove items
    static addTobasketBtn() { return this.Element(`(//span[contains(text(),'Add to Basket')])[1]`) };
    static appleJuiceAddedMsg() { return this.Element(`//span[contains(text(),'Apple Juice (1000ml)')]`) };
    static yourBasketBtn() { return this.Element(`//span[normalize-space()='Your Basket']`) };
    static appleJuiceItemBasket() { return this.Element(`//mat-cell[normalize-space()='Apple Juice (1000ml)']`) };

    //Purchase flow
    static checkoutBtn() { return this.Element(`//span[normalize-space()='Checkout']`) };
    static selectAddressBtn() { return this.Element(`//mat-cell[normalize-space()='Administrator']`) };
    static continueBtn() { return this.Element(`//span[normalize-space()='Continue']`) };
    static placeOrderBtn() { return this.Element(`//span[normalize-space()='Place your order and pay']`) };
    static purchaseSuccessMsg() { return this.Element(`//h1[normalize-space()='Thank you for your purchase!']`) };
    static paymentRadioBtn() { return this.Element(`//label[@for='mat-radio-46-input']`) };
    static oneDayDeliveryRadioBtn() { return this.Element(`(//mat-cell[@role='cell'])[2]`) };

  
    static async validateAddRemoveItems() {
        await this.addTobasketBtn().waitForDisplayed();
        await this.addTobasketBtn().click();
        await this.appleJuiceAddedMsg().waitForDisplayed();
        let juiceAddedToBasketMsg = await this.appleJuiceAddedMsg().getVisibleText();
        await this.yourBasketBtn().waitForDisplayed();
        await this.yourBasketBtn().click();
        await this.appleJuiceItemBasket().waitForDisplayed();
        let appleJuiceItemBasketText = await this.appleJuiceItemBasket().getVisibleText();
        return [juiceAddedToBasketMsg, appleJuiceItemBasketText]
    }

    static async validatePurchaseFlow() {
        await this.checkoutBtn().waitForDisplayed();
        await this.checkoutBtn().click();
        await this.selectAddressBtn().waitForDisplayed();
        await this.selectAddressBtn().click();
        await this.continueBtn().waitForEnabled();
        await this.continueBtn().click();
        await this.oneDayDeliveryRadioBtn().waitForDisplayed();
        await this.oneDayDeliveryRadioBtn().click();
        await this.continueBtn().waitForEnabled();
        await this.continueBtn().click();
        await this.paymentRadioBtn().waitForDisplayed();
        await this.paymentRadioBtn().click();
        await this.continueBtn().waitForEnabled();
        await this.continueBtn().click();
        await this.placeOrderBtn().waitForDisplayed();
        await this.placeOrderBtn().click();
        await this.purchaseSuccessMsg().waitForDisplayed();
        return await this.purchaseSuccessMsg().getVisibleText();
    }

}


