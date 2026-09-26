import { APIRequestContext } from '@playwright/test';
import { ApiTestUser } from '../data/apiTestUser';

export class UsersApi {
  constructor(private readonly request: APIRequestContext) {}

  async register(user: ApiTestUser) {
    return this.request.post('/users/register', {
      data: user,
    });
  }
}