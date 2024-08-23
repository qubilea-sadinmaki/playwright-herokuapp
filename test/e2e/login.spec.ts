import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../page-objects/login/Login.page'; 
import { ContactListPage } from '../page-objects/contact-list/ContactList.page';
import { ExpectLogin } from '../page-objects/login/Login.expect';
import { Constants } from '../util/Constants';

test.describe('Login Tests', {tag:'@login'}, () => {
    let login: LoginPage;
    let expectLogin: ExpectLogin;
    let contactList: ContactListPage;

    // Reset storage state for this file to avoid being authenticated
    test.use({ storageState: { cookies: [], origins: [] } });
    
    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        expectLogin = new ExpectLogin(page);
        contactList = new ContactListPage(page);   
        await login.visit();
    });

    
    test('should login with valid credentials', {tag:'@happycase'}, async ({ page }) => {
        await login.login(Constants.MAIN_USER.username, Constants.MAIN_USER.password);
        await contactList.loaded();
        await expect(page.url()).toContain(contactList.relativeUrl);
    });

    test('should fail login with invalid username', async ({ page }) => {
        await login.login('petri.soidindinmaki@qubilea.fi', Constants.MAIN_USER.password);
        await expectLogin.expectOnEmptyUsernameAndOrPassword();
    });

    test('should fail login with invalid password', async ({ page }) => {
        await login.login(Constants.MAIN_USER.username, 'wrongpassword');
        await expectLogin.expectOnEmptyUsernameAndOrPassword();
    });

    test('should fail login with empty credentials', async ({ page }) => {
        await login.login('', '');
        await expectLogin.expectOnEmptyUsernameAndOrPassword();
    });
});
