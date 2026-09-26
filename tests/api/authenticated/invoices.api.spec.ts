import { test, expect } from '@playwright/test';
import { InvoicesApi } from '../../../api/clients/InvoicesApi';
import { readApiAuthState } from '../../../api/data/apiAuthState';

test.describe('Invoices API Tests', () => {
  test('should reject request without authentication', async ({ request }) => {
    const response = await request.get('/invoices');

    expect(response.status()).toBe(401);
  });

  test('authenticated user should access invoices', async ({ request }) => {
    const { accessToken } = readApiAuthState();
    const invoicesApi = new InvoicesApi(request);

    const response = await invoicesApi.getAll(accessToken);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toBeDefined();
  });
});