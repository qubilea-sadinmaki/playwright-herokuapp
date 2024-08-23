import { Contact } from "../page-objects/types";


/**
 * Generates a random string of the specified length.
 *
 * @param length - The length of the random string to generate.
 * @returns The randomly generated string.
 */
function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Adds a random ending to the given last name.
 * 
 * @param lastName - The last name to add a random ending to.
 * @returns The last name with a random ending.
 */
function addRandomEnding(lastName: string): string {
    const randomEnding = generateRandomString(5); // Generate a random string of length 5
    return lastName + randomEnding;
}

/**
 * Adds random endings to the last names of the given contacts.
 * 
 * @param contacts - An array of contacts.
 * @returns An array of contacts with random endings added to their last names.
 */
export function addRandomEndings(contacts: Contact[]): Contact[] {
    return contacts.map(contact => {
        contact.lastName = addRandomEnding(contact.lastName);
        return contact;
    });
}


