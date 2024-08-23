import { expect, Page } from "@playwright/test";
import { ContactDetailsPage } from "./ContactDetails.page";
import { Contact } from "../types";

export class ExpectContactDetails {
    page: Page;
    contactDetails: ContactDetailsPage;

    constructor(page: Page) {
        this.page = page;
        this.contactDetails = new ContactDetailsPage(page);
    }

    async expectToHaveContactDetails(contact: Contact) {
        await expect(await this.contactDetails.birthdate).toHaveText(contact.birthdate);
        await expect(await this.contactDetails.email).toHaveText(contact.email);
        await expect(await this.contactDetails.firstName).toHaveText(contact.firstName);
        await expect(await this.contactDetails.lastName).toHaveText(contact.lastName);
        await expect(await this.contactDetails.phone).toHaveText(contact.phone);
        await expect(await this.contactDetails.street1).toHaveText(contact.street1);
        await expect(await this.contactDetails.street2).toHaveText(contact.street2);
        await expect(await this.contactDetails.city).toHaveText(contact.city);
        await expect(await this.contactDetails.stateProvince).toHaveText(contact.stateProvince);
        await expect(await this.contactDetails.postalCode).toHaveText(contact.postalCode);
        await expect(await this.contactDetails.country).toHaveText(contact.country);
    }
}