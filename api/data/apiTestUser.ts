import { randomUUID } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface ApiTestUser {
  first_name: string;
  last_name: string;
  dob: string;
  phone: string;
  email: string;
  password: string;

  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };
}

const authDirectory = resolve('.auth');
const apiUserFile = resolve('.auth/api-user.json');

export function generateApiTestUser(): ApiTestUser {
  const uniqueId = `${Date.now()}-${randomUUID().slice(0, 8)}`;

  return {
    first_name: 'API',
    last_name: 'Tester',
    dob: '1990-01-15',
    phone: '7805551234',
    email: `api.${uniqueId}@example.com`,
    password: `Toolshop!A1${randomUUID().slice(0, 8)}`,

    address: {
      street: '101 Test Street',
      city: 'Edmonton',
      state: 'Alberta',
      country: 'CA',
      postal_code: 'T5J0N3',
    },
  };
}

export function saveApiTestUser(user: ApiTestUser): void {
  mkdirSync(authDirectory, { recursive: true });
  writeFileSync(apiUserFile, JSON.stringify(user, null, 2));
}

export function readApiTestUser(): ApiTestUser {
  return JSON.parse(readFileSync(apiUserFile, 'utf-8'));
}