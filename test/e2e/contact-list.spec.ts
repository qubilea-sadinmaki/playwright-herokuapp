import { test } from '@playwright/test';
import { HerokuApp } from '../page-objects/HerokuApp';
import myUserData from '../test-data/contacts.json';
import { addRandomEndings } from '../util/contacts';
import { Contact } from '../page-objects/types';
import { useStoragedCookies } from '../util/testUtil';



test.describe("Contact List", {tag:'@contactList'}, () => {
    useStoragedCookies();

    let herokuApp: HerokuApp;
    let contacts: Contact[] = myUserData;
    contacts = addRandomEndings(contacts);

    test.beforeEach(async ({ page }) => {
        herokuApp = new HerokuApp();
        await herokuApp.initialize(page);   
        await herokuApp.contactList.visit();
        await herokuApp.contactList.loaded();
    });

    test.afterAll(async () => {
 
    });

    test("should add new contact", {tag:'@happycase'}, async ({ page }) => {
        await herokuApp.contactList.addContact()
        await herokuApp.addContact.fill(contacts[0]);
        await herokuApp.addContact.submit();
        await herokuApp.contactList.loaded();
        await herokuApp.expectContactList.expectToHaveContact(contacts[0]);
    });

    test("should edit contact", {tag:['@happycase','@flaky']}, async ({ page }) => {
        await herokuApp.contactList.addContact();
        await herokuApp.addContact.addContact(contacts[1]);
        await herokuApp.contactList.openContactDetails(contacts[1]);
        await herokuApp.contactDetails.editContactBtn.click();
        await herokuApp.editContact.fill(contacts[2]);
        await herokuApp.editContact.submit();
        
        await herokuApp.contactDetails.loaded();
        await herokuApp.expectContactDetails.expectToHaveContactDetails(contacts[2]);
        await herokuApp.contactDetails.toContactListBtn.click();
        await herokuApp.contactList.loaded();
        await herokuApp.expectContactList.expectToHaveContact(contacts[2]);
    });

    test("should remove contact", {tag:['@happycase','@flaky']}, async ({ page }) => {
        await herokuApp.contactList.addContact();
        await herokuApp.addContact.addContact(contacts[3]);
        await herokuApp.contactList.loaded();
        await herokuApp.contactList.openContactDetails(contacts[3]);
        await herokuApp.contactDetails.deleteContact();
        await herokuApp.contactList.loaded();
        await herokuApp.expectContactList.expectToNotHaveContact(contacts[3]);
    });

    test("should have contact details", {tag:'@happycase'}, async ({ page }) => {
        await herokuApp.contactList.addContact();
        await herokuApp.addContact.addContact(contacts[4]);
        await herokuApp.contactList.openContactDetails(contacts[4]);
        await herokuApp.expectContactDetails.expectToHaveContactDetails(contacts[4]);
    });

    test("should remove all contacts", {tag:'@happycase'}, async ({ page }) => {
        await herokuApp.contactList.loaded();
        await page.waitForTimeout(1000); // wait for the contacts to load
        
        await herokuApp.contactList.getContactNames().then(async (names) => {
            for (const name of names) {
                await herokuApp.contactList.openContactDetailsByName(name);
                await herokuApp.contactDetails.deleteContact();
                await herokuApp.contactList.loaded();
            }
        });

        await herokuApp.expectContactList.expectToNotHaveContacts();
    });
})