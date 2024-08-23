import { Page } from "@playwright/test";
import { AddContactPage } from "./AddContact.page";

export class EditContactPage extends AddContactPage{
    relativeUrl: string = '/editContact';
    title = "Edit Contact";
    
    constructor(page:Page){
        super(page)
    }
}