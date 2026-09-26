import { APIRequestContext } from '@playwright/test';

export class InvoicesApi {
  constructor(private readonly request: APIRequestContext) {}

  async getAll(token: string) {
    return this.request.get('/invoices', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}