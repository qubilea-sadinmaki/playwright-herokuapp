import { expect, Page } from "@playwright/test";
import { ContactListPage } from "./ContactList.page";
import { Contact } from "../types";

export class ExpectContactList {
    page: Page;
    contactList: ContactListPage;

    constructor(page: Page) {
        this.page = page;
        this.contactList = new ContactListPage(page);
    }

    async expectToHaveContact(contact: Contact) {
        await expect(await this.contactList.getContact(contact)).toBeVisible()
    }

    async expectToNotHaveContact(contact: Contact) {
        await expect(await this.contactList.getContact(contact)).not.toBeVisible()
    }

    async expectToNotHaveContacts() {
        await expect(await this.contactList.contactElements.all.length).toBe(0)
    }
}