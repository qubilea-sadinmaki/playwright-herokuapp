import { Page } from "@playwright/test";
import { ContactListPage } from "./contact-list/ContactList.page";
import { ExpectLogin } from "./login/Login.expect";
import { LoginPage } from "./login/Login.page";
import { AddContactPage } from "./contact-list/AddContact.page";
import { EditContactPage } from "./contact-list/EditContact.page";
import { ContactDetailsPage } from "./contact-list/ContactDetails.page";
import { ExpectContactList } from "./contact-list/ContactList.expect";
import { ExpectAddContact } from "./contact-list/AddContact.expect";
import { ExpectEditContact } from "./contact-list/EditContact.expect";
import { ExpectContactDetails } from "./contact-list/ContactDetails.expect";

/**
 * Represents the HerokuApp application.
 * Provides methods to initialize and interact with various pages and their expectations.
 */
export class HerokuApp {
    page: Page;
    login: LoginPage;
    contactList: ContactListPage;
    addContact: AddContactPage;
    editContact: EditContactPage;
    contactDetails: ContactDetailsPage;
    expectLogin: ExpectLogin;
    expectContactList: ExpectContactList;
    expectAddContact: ExpectAddContact;
    expectEditContact: ExpectEditContact;
    expectContactDetails: ExpectContactDetails;

    /**
     * Initializes the HerokuApp with the provided page object.
     * @param page The page object used for interacting with the application.
     */
    async initialize(page: Page) {
        this.page = page;
        this.login = new LoginPage(page);
        this.contactList = new ContactListPage(page);
        this.addContact = new AddContactPage(page);
        this.editContact = new EditContactPage(page);
        this.contactDetails = new ContactDetailsPage(page);

        this.expectLogin = new ExpectLogin(page);
        this.expectContactList = new ExpectContactList(page);
        this.expectAddContact = new ExpectAddContact(page);
        this.expectEditContact = new ExpectEditContact(page);
        this.expectContactDetails = new ExpectContactDetails(page);
    }
}
