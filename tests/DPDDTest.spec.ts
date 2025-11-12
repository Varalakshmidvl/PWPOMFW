import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import products from '../TestData/products.json'
console.log(products);

let url = "https://rahulshettyacademy.com/client"
const username ="varalakshmi.doddi@gmail.com"
const password ="Hydchn66@@"
const productName = "IPHONE 13 PRO"

let loginPage : LoginPage
let dashboardPage : DashboardPage

test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page)
    dashboardPage = new DashboardPage(page)
    await  loginPage.launchURL(url)
    await loginPage.loginIntoApplication(username, password)
})
// here we are placing for loop from test because before each not taking any data from Testdata /excel sheet
for(let data of products){
  test(`Add the product to cart for ${data.productName}`, async ()=>{
        await  loginPage.launchURL(data.url)
        await loginPage.loginIntoApplication(data.username, data.password)
        await dashboardPage.searchAndAddProductToCart(data.productName)
        await expect(dashboardPage.addToCartSuccessMsg).toHaveText("Product Added To Cart")

})                                                            
test("Search and validate the product for"+ data.productName, async ()=>{
       await  loginPage.launchURL(data.url)
        await loginPage.loginIntoApplication(data.username, data.password)
await dashboardPage.searchAndViewProductToCart(data.productName)
//await expect(dashboardPage.viewPageProductName).toHaveText(productName.toLowerCase())
  const productText = await dashboardPage.viewPageProductName.innerText()
   await expect(productText.toLowerCase()).toBe(data.productName.toLowerCase())
})

}


