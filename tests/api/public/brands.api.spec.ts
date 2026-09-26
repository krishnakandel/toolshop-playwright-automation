import { test, expect } from '@playwright/test';
import { BrandsApi } from '../../../api/clients/BrandsApi';

test.describe('Brands API Tests', () => {
  test('GET /brands should return brands', async ({ request }) => {
    const brandsApi = new BrandsApi(request);

    const response = await brandsApi.getAll();

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('GET /brands should return JSON', async ({ request }) => {
    const brandsApi = new BrandsApi(request);

    const response = await brandsApi.getAll();

    expect(response.headers()['content-type']).toContain('application/json');
  });
});