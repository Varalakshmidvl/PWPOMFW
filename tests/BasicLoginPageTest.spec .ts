
import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

let url = "https://rahulshettyacademy.com/client"
const username ="varalakshmi.doddi@gmail.com"
const password ="Hydchn66@@"
const invalidPassword = "test123"
const emptypass = ""

test("Valid Login scenario", {tag:'@smoke'},async ({page}) => {

    let loginPage = new LoginPage(page)
    await loginPage.launchURL(url)
    await loginPage.loginIntoApplication(username,password)
   // await expect(loginPage.errorMessage).toHaveText("Incorrect email or password.")
    await expect(loginPage.homepageIdentifier).toBeVisible()

})
 
test("Invalid Login Scenario", async({page})=>
{
  let loginpage =new LoginPage(page)
  await loginpage.launchURL(url)
  await loginpage.invalidLogin(username,invalidPassword)
    await expect(loginpage.errorMessage).toBeVisible()
     
});

test("Check if the app throwing error for empty pasword",async({page})=>{
  let loginpage =new LoginPage(page)
  await loginpage.launchURL(url)
  await loginpage.EmptyPasswordscenario(username ,emptypass )
  await expect(loginpage.emptypassErrorMsg).toBeVisible()
 //await expect(loginpage.homepageIdentifier).toBeVisible()
  })
 

