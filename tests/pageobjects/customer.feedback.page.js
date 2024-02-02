
import { BasePage } from './base.page.js';
import testData from "../testData/testData.json" assert { type: "json" };
import { driver } from '@wdio/globals';
import randomize from 'randomatic';


export class JuiceElement {
    static Element(locator) {

        return new BasePage(locator);
    }
}

export class JuiceCustomerFeedbackpage extends JuiceElement {



    //Customer feed bacb
    static menuBtn() { return this.Element(`//mat-icon[normalize-space()='menu']`) };
    static custFeedBackBtn() { return this.Element(`//span[normalize-space()='Customer Feedback']`) };
    static commentInputBox() { return this.Element(`//textarea[@id='comment']`) };
    static sliderEle() { return this.Element(`//mat-slider[@id='rating']`) };
    static captchaText() { return this.Element(`//code[@id='captcha']`) };
    static captchaControl() { return this.Element(`//input[@id='captchaControl']`) };
    static submitButton() { return this.Element(`//button[@id='submitButton']//span[@class='mat-button-wrapper']`) };
    static custFeebackSuccessMsg() { return this.Element(`//span[contains(text(),'Thank you for your feedback.')]`) };


    static async validateCustomerFeedback() {
        await this.menuBtn().waitForDisplayed();
        await this.menuBtn().click();
        await this.custFeedBackBtn().waitForDisplayed();
        await this.custFeedBackBtn().click();
        await this.commentInputBox().waitForDisplayed();
        await this.commentInputBox().addValue('TestComment');

        const slider = await browser.$('#rating');
        const sliderWidth = await slider.getSize('width');
        const desiredPercentage = 80;
        const desiredPosition = Math.round((sliderWidth * desiredPercentage) / 100);
        await slider.click();

        let captchaText = await this.captchaText().getVisibleText();
        const captchaResult = await eval(captchaText);
        await this.captchaControl().addValue(captchaResult);
        await this.submitButton().waitForEnabled();
        await this.submitButton().click();
        await this.custFeebackSuccessMsg().waitForDisplayed();
        return await this.custFeebackSuccessMsg().getVisibleText();
        
    }
}


