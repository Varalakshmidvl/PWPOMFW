import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'

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

test('Add the product to Cart',async()=>{
    await dashboardPage.searchAndAddProductToCart(productName)
    await expect(dashboardPage.addToCartSuccessMsg).toHaveText('Product Added To Cart')
})                                                            

test('Search and validate the product',async()=>{  
await dashboardPage.searchAndViewProductToCart(productName)
await expect(dashboardPage.viewPageProductName).toHaveText(productName.toLowerCase())
  const actualProductName = await dashboardPage.viewPageProductName.textContent()
    console.log("Viewed Product Name:", actualProductName?.trim())

})


