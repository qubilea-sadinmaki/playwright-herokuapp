import { PageObjectModel } from "../PageObjectModel";
import { expect, Page } from "@playwright/test";

/**
 * Represents the Contact Details page of the application.
 * Extends the PageObjectModel class to provide common page functionalities.
 */
export class ContactDetailsPage extends PageObjectModel {

    relativeUrl: string = '/contactDetails';
    title = "Contact Details";
    editContactBtn = this.page.locator('#edit-contact');
    deleteContactBtn = this.page.locator('#delete');
    toContactListBtn = this.page.locator('#return');

    firstName = this.page.locator('#firstName');
    lastName = this.page.locator('#lastName');
    birthdate = this.page.locator('#birthdate');
    email = this.page.locator('#email');
    phone = this.page.locator('#phone');
    street1 = this.page.locator('#street1');
    street2 = this.page.locator('#street2');
    city = this.page.locator('#city');
    stateProvince = this.page.locator('#stateProvince');
    postalCode = this.page.locator('#postalCode');
    country = this.page.locator('#country');

    /**
     * Creates a new instance of the ContactDetailsPage class.
     * @param page The page object used for interacting with the contact details page.
     */
    constructor(page: Page) {
        super(page);
    }

    /**
     * Deletes the contact currently displayed on the contact details page.
     * Waits for a confirmation dialog and accepts it.
     */
    async deleteContact() {
        this.page.once('dialog', async dialog => {    
            expect(dialog.type()).toBe('confirm');
            expect(dialog.message()).toBe('Are you sure you want to delete this contact?');
            await dialog.accept();
        });

        await this.deleteContactBtn.click();   
    }
}