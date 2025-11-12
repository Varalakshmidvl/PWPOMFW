
import { Locator, Page } from '@playwright/test'


export class DashboardPage {

    private page: Page
    products: Locator
    addToCartSuccessMsg: Locator
    viewPageProductName: Locator

    constructor(page: Page) {
        this.page = page
        this.products = this.page.locator('div.card-body')
        this.addToCartSuccessMsg = this.page.locator('#toast-container')
        this.viewPageProductName = this.page.locator('div.rtl-text h2')
        //or this.page.locator("div.rtl-text").locator("h2")

    }
    async searchAndAddProductToCart(productName: string) {
      await this.products.last().waitFor()
        const countOfProd = await this.products.count() // 3 - 0,1,2
                 for (let i = 0; i < countOfProd; i++) {
            //const productText =await this.products.locator('h5').innerText()//fail due to strictmode voilation
            const productText = await this.products.nth(i).locator("b").innerText()
            if (productText === productName) {
                await this.products.nth(i).locator("button").last().click()
                break
            }
        }
    }
        async searchAndViewProductToCart(productName: string){
        await this.products.last().waitFor()
        const countOfProducts = await this.products.count() // 3 - 0,1,2
      await this.page.waitForTimeout(3000)
        for(let i=0;i<countOfProducts; i++){
            const productText = await this.products.nth(i).locator("b").innerText()
            if(productText === productName){
                await this.products.nth(i).locator("button").first().click()
                break
            }
        }
     
    }
  
}

   



