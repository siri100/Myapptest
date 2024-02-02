
export class BasePage {

    
    constructor(locator) {
      
        this.locator = locator;
        this.UIElement = $(locator);
    }

    async click() {

        await (await this.UIElement).click();
    }
    async addValue(keys) {
        await (await this.UIElement).addValue(keys);
    }
    async setValue(keys) {
        await (await this.UIElement).setValue(keys);
    }
    async getAttribute(attribute) {
        return await (await this.UIElement).getAttribute(attribute);
    }

    async getVisibleText() {

        return await (await this.UIElement).getText();
    }

    async waitForDisplayed() {
        return await (await this.UIElement).waitForDisplayed({ timeout: 70000 });
    }
    async waitForEnabled() {
        return await (await this.UIElement).waitForEnabled();
    }
    async isEnabled() {
        return await (await this.UIElement).isEnabled();
    }
    async isDisplayed() {
        return await (await this.UIElement).isDisplayed();
    }
    async clearValue() {
        return await (await this.UIElement).clearValue();
    }
    async scrollIntoView() {
        return await (await this.UIElement).scrollIntoView();
    }
    async selectByValue(value) {
        return await (await this.UIElement).selectByVisibleText(value);
    }
    

}
