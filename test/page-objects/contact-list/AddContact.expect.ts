import { expect, Page } from "@playwright/test";
import { AddContactPage } from "./AddContact.page";

export class ExpectAddContact {
    page: Page;
    addContact: AddContactPage;

    constructor(page: Page) {
        this.page = page;
        this.addContact = new AddContactPage(page);
    }
}