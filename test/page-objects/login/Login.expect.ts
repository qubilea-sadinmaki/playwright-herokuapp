import { expect, Page } from "@playwright/test";
import { LoginPage } from "./Login.page";

export class ExpectLogin
{
    page: Page;
    login: LoginPage

    public constructor(page: Page)
    {
        this.page = page;
        this.login = new LoginPage(page);
    }

    async expectOnEmptyUsernameAndOrPassword()
    {
        await expect(await this.login.errorField).toHaveText('Incorrect username or password');
    }
}