import { test, expect } from '@playwright/test';
import { AuthApi } from '../../../api/clients/AuthApi';
import { readApiTestUser } from '../../../api/data/apiTestUser';

test.describe('Login API Tests', () => {
  test('should login with valid credentials', async ({ request }) => {
    const user = readApiTestUser();
    const authApi = new AuthApi(request);

    const response = await authApi.login(user.email, user.password);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.access_token).toBeTruthy();
  });

  test('should reject incorrect password', async ({ request }) => {
    const user = readApiTestUser();
    const authApi = new AuthApi(request);

    const response = await authApi.login(user.email, 'WrongPassword123!');

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('should reject unknown user', async ({ request }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.login(`unknown.${Date.now()}@example.com`, 'Password123!');

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});