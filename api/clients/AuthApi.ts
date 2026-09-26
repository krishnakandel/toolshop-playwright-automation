import { APIRequestContext } from '@playwright/test';

export class AuthApi {
  constructor(private readonly request: APIRequestContext) {}

  async login(email: string, password: string) {
    return this.request.post('/users/login', {
      data: {
        email,
        password,
      },
    });
  }
}