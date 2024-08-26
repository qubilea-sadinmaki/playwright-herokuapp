import test from "@playwright/test";

/**
 * Retrieves and uses the stored cookies for authentication.
 */
export function useStoragedCookies() {
    const authFile = 'playwright/.auth/user.json';
    // So that all our tests use the account that was logged using the API
    const userData = require('../../playwright/.auth/user.json');
    test.use({ storageState: authFile, extraHTTPHeaders: {'Authorization': `Bearer ${userData.cookies[0].value}`} });
}