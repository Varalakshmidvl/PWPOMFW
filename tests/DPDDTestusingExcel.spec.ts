import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import { ExcelUtils } from '../utils/ExcelUtils'
import path from 'path'


const filePath = path.join(__dirname, "../TestData/LoginData.xlsx")
const sheetName = "Login"

let products:any
try{
    products = ExcelUtils.getExcelData(filePath, sheetName)
}
catch(message){
  console.log(message);
}

//console.log(products);

let loginPage : LoginPage
let dashboardPage : DashboardPage

    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page)
        dashboardPage = new DashboardPage(page)
    })

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
        const productText = await dashboardPage.viewPageProductName.innerText()
        await expect(productText.toLowerCase()).toBe(data.productName.toLowerCase())
    })
  }
