import { test as setup, expect } from '@playwright/test';
import { AuthApi } from '../../../api/clients/AuthApi';
import { readApiTestUser } from '../../../api/data/apiTestUser';
import { saveApiAuthState } from '../../../api/data/apiAuthState';

setup('authenticate API test user', async ({ request }) => {
  const user = readApiTestUser();
  const authApi = new AuthApi(request);

  const response = await authApi.login(user.email, user.password);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.access_token).toBeTruthy();

  saveApiAuthState({
    accessToken: body.access_token,
  });

  console.log(`API authentication completed for: ${user.email}`);
});