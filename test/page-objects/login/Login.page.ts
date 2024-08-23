import { Page } from '@playwright/test';
import { PageObjectModel } from '../PageObjectModel';
import { Constants } from '../../util/Constants';

/**
 * Represents the login page of the application.
 * Extends the PageObjectModel class to provide common page functionalities.
 */
export class LoginPage extends PageObjectModel {
    /**
     * The basic user credentials from the constants.
     */
    basicUser = Constants.MAIN_USER;
    relativeUrl = '/';
    usernameInput = this.page.locator('#email');
    passwordInput = this.page.locator('#password');
    submitBtn = this.page.locator('#submit');
    errorField = this.page.locator('#error');

    constructor(page: Page) {
        super(page);
    }

    /**
     * Logs in to the application using the provided username and password.
     * @param username The username to use for login.
     * @param password The password to use for login.
     */
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitBtn.click();
    }

    /**
     * Logs in to the application using the basic user credentials.
     */
    async loginAsBasicUser() {
        await this.login(this.basicUser.username, this.basicUser.password);
    }
}