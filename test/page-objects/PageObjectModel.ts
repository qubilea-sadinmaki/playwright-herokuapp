import { Page } from '@playwright/test';
import { log } from 'console';

/**
 * Represents a base page object model for the application.
 * Provides common functionalities for interacting with pages.
 */
export class PageObjectModel {
    public relativeUrl: string = '';
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Visits the page by navigating to its relative URL.
     * Waits for the network to be idle before proceeding.
     */
    public async visit() {
        log(this.relativeUrl)
        await this.page.goto(this.relativeUrl);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Waits for the page to be fully loaded by checking the URL.
     */
    public async loaded(){
        await this.page.waitForURL(`**${this.relativeUrl}`);
    }
}