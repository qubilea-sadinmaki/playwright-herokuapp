import { test as setup } from '@playwright/test';
import { Constants } from '../util/Constants';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ request }) => {
  
  await request.post('https://thinking-tester-contact-list.herokuapp.com/users/login', {
    data: {
      'email': `${Constants.MAIN_USER.username}`,
      'password': `${Constants.MAIN_USER.password}`
    }
  });
  await request.storageState({ path: authFile });
});