//locators and methods related to login page
//Valid login scenarios --Valid Credentials
//Invalid login scenarios --Invalid credentials
//invalid login scenario --password is empty
import { Locator, Page } from '@playwright/test'

   export class LoginPage {
  
    private page:Page
    private username : Locator
    private password : Locator
    private LoginBtn : Locator
    errorMessage : Locator
    emptypassErrorMsg : Locator
    homepageIdentifier : Locator
   
    constructor(page:Page){
        this.page = page
        this.username = this.page.getByPlaceholder("email@example.com")
        this.password = this.page.getByPlaceholder("enter your passsword")
        this.LoginBtn = this.page.locator("#login")
        this.errorMessage = this.page.locator("#toast-container")
        this.emptypassErrorMsg = this.page.getByText("*Password is required")
        this.homepageIdentifier = this.page.locator(".fa-sign-out")//assertion

    }

    async launchURL(url: string) {
       await this.page.goto(url)
       

    }

    async loginIntoApplication(username: string, password: string) {

        await this.username.fill(username)
        await this.password.fill(password)
        await this.LoginBtn.click()
    }

   async invalidLogin(username : string ,invalidPassword :string)
   {
    await this.loginIntoApplication(username, invalidPassword)
    
   }

  async EmptyPasswordscenario(username :string, emptypass: string){
      await this.loginIntoApplication(username , emptypass )
  }

}