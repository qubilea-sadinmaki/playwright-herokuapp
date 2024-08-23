import { expect, Locator, Page } from '@playwright/test';
import { PageObjectModel } from '../PageObjectModel';
import { Contact } from '../types';

export class ContactListPage extends PageObjectModel {
    relativeUrl = '/contactList';
    subtitle = "Click on any contact to view the Contact Details";
    addContactBtn = this.page.locator('#add-contact');
    logoutBtn = this.page.locator('#logout');
    contactElements = this.page.locator('.contactTableBodyRow')

    constructor(page: Page) {
        super(page);
    }

    override async loaded() {
        await super.loaded();
    }

    async addContact() {
        await this.addContactBtn.click();
    }

    getContact(contact: Contact): Locator {
        return this.page.locator(`//tr[contains(., '${contact.firstName} ${contact.lastName}') and contains(., '${contact.birthdate}')]`);
    }

    async getContactNames(): Promise<string[]> {
        let names: string[] = [];
        for (const td of await this.contactElements.all()){
            var name = await td.locator('td').nth(1).textContent();
            if (name !== null) {
                names.push(name);
            }
        }
     
        return names;
    }

    async openContactDetails(contact:Contact) {
        await this.getContact(contact).click();
    }

    async openContactDetailsByName(contactName: string) {
        await this.page.getByText(contactName).click();
    }

    async logout(){
        await this.logoutBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}