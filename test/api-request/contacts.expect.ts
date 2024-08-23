import { APIResponse, expect } from "@playwright/test";
import { Contact } from "../page-objects/types";
import { Logger } from "../util/Logger";

/**
 * This module contains functions for asserting the presence of a contact in an API response.
 * @module contacts.expect
 */

/**
 * Asserts that a contact is present in the API response.
 * @param {APIResponse} response - The API response object.
 * @param {Contact} contact - The contact object to be checked.
 * @returns {Promise<void>} - A promise that resolves when the assertion is complete.
 */
export async function expectContactToBeOnResponse(response: APIResponse, contact: Contact) {
    const contactsListJson = await response.json();
    // Remove fields that are not in the original contact, so that we can compare the objects
    contactsListJson.forEach((contact: Object) => { 
        delete contact['_id'];
        delete contact['__v'];
        delete contact['owner'];
    })
    
    expect(contactsListJson).toContainEqual(contact);
    Logger.log(`Contact ${contact.firstName} ${contact.lastName} was found in the response`);    
}

/**
 * Asserts that a contact is NOT present in the API response.
 * @param {APIResponse} response - The API response object.
 * @param {string} contactID - The contact object to be checked.
 * @returns {Promise<void>} - A promise that resolves when the assertion is complete.
 */
export async function expectContactToNotBeOnResponse(response: APIResponse, contactID: string) {
    let contactsListJson = await response.json();

    const contactIDs = contactsListJson.map((contact: any) => contact._id);
    expect(contactIDs).not.toContain(contactID); 
    Logger.log(`Contact with ID: ${contactID} was not found in the response`);   
}