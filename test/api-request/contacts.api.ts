import { APIResponse, expect, Page } from "@playwright/test";
import { Contact } from "../page-objects/types";
import { Logger } from "../util/Logger";

/**
 * Represents an API for managing contacts.
 */
export class ContactsApi {
    /**
     * The page object used for making API requests.
     */
    page: Page;

    /**
     * Creates a new instance of the ContactsApi class.
     * @param page The page object used for making API requests.
     */
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Adds a new contact.
     * @param contact The contact object to be added.
     * @returns A promise that resolves to the API response.
     */
    async addContact(contact: Contact): Promise<APIResponse> {
        const response = await this.page.request.post('/contacts', {
            data: {
                firstName: contact.firstName,
                lastName: contact.lastName,
                birthdate: contact.birthdate,
                email: contact.email,
                phone: contact.phone,
                street1: contact.street1,
                street2: contact.street2,
                city: contact.city,
                stateProvince: contact.stateProvince,
                postalCode: contact.postalCode,
                country: contact.country
            }
        });

        expect(response.status()).toBe(201);
        Logger.log(`Contact ${contact.firstName} ${contact.lastName} was added to contacts`);

        return response;
    }

    /**
     * Retrieves the list of contacts.
     * @returns A promise that resolves to the API response.
     */
    async getContactList(): Promise<APIResponse> {
        const response = await this.page.request.get('/contacts');
        expect(response.status()).toBe(200);
        return response;
    }

    /**
     * Deletes a contact by ID.
     * @param contactID The ID of the contact to be deleted.
     * @returns A promise that resolves to the API response.
     */
    async deleteContact(contactID: string): Promise<APIResponse> {
        const response = await this.page.request.delete(`/contacts/${contactID}`);
        expect(response.status()).toBe(200);
        Logger.log(`Contact with ID: ${contactID} was deleted`);

        return response;
    }
}
