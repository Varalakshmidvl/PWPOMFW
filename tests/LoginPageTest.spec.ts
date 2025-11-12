
import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

let url = "https://rahulshettyacademy.com/client"
const username ="varalakshmi.doddi@gmail.com"
const password ="Hydchn66@@"
const invalidPassword = "test123"
const emptypass = ""

let loginPage : LoginPage
test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page)
    await  loginPage.launchURL(url)
})


test("Valid Login scenario", {tag:'@smoke'},async () => {

           await loginPage.loginIntoApplication(username,password)
   // await expect(loginPage.errorMessage).toHaveText("Incorrect email or password.")
    await expect(loginPage.homepageIdentifier).toBeVisible()

})
 
test("Invalid Login Scenario", {tag: ['@smoke', '@regression']},async()=>
{
  
  await loginPage.invalidLogin(username,invalidPassword)
    await expect(loginPage.errorMessage).toBeVisible()
     
});

test("@smoke @regression Check if the app throwing error for empty pasword",async()=>{
  
  await loginPage.EmptyPasswordscenario(username ,emptypass )
  await expect(loginPage.emptypassErrorMsg).toBeVisible()
 //await expect(loginpage.homepageIdentifier).toBeVisible()
  })
 

