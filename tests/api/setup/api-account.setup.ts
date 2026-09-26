import { test as setup, expect } from '@playwright/test';
import { UsersApi } from '../../../api/clients/UsersApi';
import { generateApiTestUser, saveApiTestUser } from '../../../api/data/apiTestUser';

setup('create fresh API test user', async ({ request }) => {
  const user = generateApiTestUser();
  const usersApi = new UsersApi(request);

  const response = await usersApi.register(user);

  expect(response.ok()).toBeTruthy();

  saveApiTestUser(user);

  console.log(`Fresh API user created: ${user.email}`);
});