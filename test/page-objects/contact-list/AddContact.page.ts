import { expect, Page } from '@playwright/test';
import { PageObjectModel } from '../PageObjectModel';
import { Contact } from '../types';


export class AddContactPage extends PageObjectModel {
    relativeUrl = '/addContact';
    title = "Add Contact";
    firstNameInput = this.page.locator('#firstName');
    lastNameInput = this.page.locator('#lastName');
    birthdateInput = this.page.locator('#birthdate');
    emailInput = this.page.locator('#email');
    phoneInput = this.page.locator('#phone');
    street1Input = this.page.locator('#street1');
    street2Input = this.page.locator('#street2');
    cityInput = this.page.locator('#city');
    stateProvinceInput = this.page.locator('#stateProvince');
    postalCodeInput = this.page.locator('#postalCode');
    countryInput = this.page.locator('#country');
    submitBtn = this.page.locator('#submit');
    cancelBtn = this.page.locator('#cancel');
    errorField = this.page.locator('#error');

    constructor(page: Page) {
        super(page);
    }

    override async loaded() {
        await super.loaded();
        await this.page.getByText(this.title);
    }

    async addContact(contact: Contact) {
        await this.fill(contact);
        await this.submit();
    }

    async editContact(contact: Contact) {
        await this.fill(contact);
        await this.submit();
    }

    async fill(contact: Contact) {
        await this.firstNameInput.fill(contact.firstName);
        await this.lastNameInput.fill(contact.lastName);
        await this.birthdateInput.fill(contact.birthdate);
        await this.emailInput.fill(contact.email);
        await this.phoneInput.fill(contact.phone);
        await this.street1Input.fill(contact.street1);
        await this.street2Input.fill(contact.street2);
        await this.cityInput.fill(contact.city);
        await this.stateProvinceInput.fill(contact.stateProvince);
        await this.postalCodeInput.fill(contact.postalCode);
        await this.countryInput.fill(contact.country);
    }

    async fillOnlyMandatory(contact: Contact) {
        await this.firstNameInput.fill(contact.firstName);
        await this.lastNameInput.fill(contact.lastName);
    }

    async submit(){
        expect(await this.submitBtn.isEnabled()).toBeTruthy();
        await this.submitBtn.click();
    }
}