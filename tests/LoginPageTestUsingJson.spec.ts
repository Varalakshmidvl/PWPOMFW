//import loginData  from  '../TestData/login.json'
//console.log(loginData);

/* let loginData = {
     url: "https://rahulshettyacademy.com/client",
    username  : "varalakshmi.doddi@gmail.com",
    password: "Hydchn66@@",
    incorrectPassword : "Test",
    emptyPassword  : " "
}

 console.log(loginData); */

import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import loginData from '../TestData/login.json'

 /* let url: "https://rahulshettyacademy.com/client"
const username: "varalakshmi.doddi@gmail.com"
const password: "Hydchn66@@"
const incorrectPassword: "Test"
const emptyPassword: "  " */

let loginPage: LoginPage
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.launchURL(loginData.url)
})

test("Valid Login Scenario", { tag: '@smoke' }, async () => {
    await loginPage.loginIntoApplication(loginData.username, loginData.password)
    await expect(loginPage.homepageIdentifier).toBeVisible()
})

test("Invalid Login scenario", { tag: '@regression' }, async () => {
    await loginPage.invalidLogin(loginData.username, loginData.incorrectPassword)
    await expect(loginPage.errorMessage).toHaveText("Incorrect email or password.")
})

test("@smoke @regression Check if the application is throwing error for empty password", async () => {
    await loginPage.EmptyPasswordscenario(loginData.username, loginData.emptyPassword)
    await expect(loginPage.emptypassErrorMsg).toBeVisible()
})

