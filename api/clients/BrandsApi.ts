import { APIRequestContext } from '@playwright/test';

export class BrandsApi {
  constructor(private readonly request: APIRequestContext) {}

  async getAll() {
    return this.request.get('/brands');
  }
}