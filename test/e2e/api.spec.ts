import { test, expect, type Page } from '@playwright/test';
import myUserData from '../test-data/contacts.json';
import { Contact } from '../page-objects/types';
import { addRandomEndings } from '../util/contacts';
import { ContactsApi } from '../api-request/contacts.api';
import { expectContactToBeOnResponse, expectContactToNotBeOnResponse } from '../api-request/contacts.expect';
const authFile = 'playwright/.auth/user.json';

test.describe('API Tests',{tag:['@api', '@happycase']}, () => {
 
    // So that all our tests use the account that was logged using the API
    const userData = require('../../playwright/.auth/user.json');
    test.use({ storageState: authFile, extraHTTPHeaders: {'Authorization': `Bearer ${userData.cookies[0].value}`} });
    let contacts: Contact[] = myUserData;
    const contacts2: Contact[] = addRandomEndings(contacts);
    contacts = addRandomEndings(contacts);
    let contact: Contact = contacts[0];

    test('Add one contact', async ({ page }) => {
        const contactApi = new ContactsApi(page);
        await contactApi.addContact(contact);

        // Get the list of contacts and check that the added contact is in the list
        const responseGet = await contactApi.getContactList();

        expectContactToBeOnResponse(responseGet, contact);
    });

    test('Add multiple contacts', async ({ page }) => {
        const contactApi = new ContactsApi(page);

        for (let contact of contacts2) {
            await contactApi.addContact(contact);
        }

        // Get the list of contacts and check that the added contacts are in the list
        const responseGet = await contactApi.getContactList();

        for (let contact of contacts2) {
            expectContactToBeOnResponse(responseGet, contact);
        }
    });


    test('Remove first contact', async ({ page }) => {
        let contactApi = new ContactsApi(page);
        let responseGet = await contactApi.getContactList();
        expect(responseGet.status()).toBe(200);
        let contactsListJson = await responseGet.json();
        const contactID = contactsListJson[0]._id;

        await contactApi.deleteContact(contactID);
        
        
        // Get the list of contacts and check that the removed contact is NOT in the list anymore
        responseGet = await contactApi.getContactList();   
        expectContactToNotBeOnResponse(responseGet, contactID);
    });

    test('Remove all contacts', async ({ page }) => {
        let contactApi = new ContactsApi(page);
        let responseGet = await contactApi.getContactList(); 
        let contactsListJson = await responseGet.json();

        contactsListJson.forEach(async (contact) => {
            await contactApi.deleteContact(contact._id);
        });

        // we need to wait for the contacts to be deleted
        await page.waitForTimeout(500);
        // Get the list of contacts and check that the contacts list is empty 
        responseGet = await contactApi.getContactList();
        contactsListJson = await responseGet.json();
        expect(contactsListJson).toEqual([]);
    });
});