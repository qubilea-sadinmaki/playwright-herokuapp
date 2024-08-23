import { expect, Page } from "@playwright/test";
import { EditContactPage } from "./EditContact.page";

export class ExpectEditContact {
    page: Page;
    editContact: EditContactPage;

    constructor(page: Page) {
        this.page = page;
        this.editContact = new EditContactPage(page);
    }
}