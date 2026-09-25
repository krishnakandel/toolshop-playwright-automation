import { randomUUID } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface TestUser {
  firstName: string;
  lastName: string;
  dob: string;

  country: string;
  postalCode: string;
  houseNumber: string;

  street: string;
  city: string;
  state: string;

  phone: string;
  email: string;
  password: string;
}

const authDirectory = resolve('.auth');
const testUserFile = resolve('.auth/test-user.json');

export function generateTestUser(): TestUser {
  const uniqueId = `${Date.now()}-${randomUUID().slice(0, 8)}`;

  return {
    firstName: 'Automation',
    lastName: 'Tester',
    dob: '1990-01-15',

    country: 'CA',
    postalCode: 'T5J0N3',
    houseNumber: '101',

    street: '101 Test Street',
    city: 'Edmonton',
    state: 'Alberta',

    phone: '7805551234',
    email: `automation.${uniqueId}@example.com`,
    password: `Toolshop!A1${randomUUID().slice(0, 8)}`,
  };
}

export function saveTestUser(user: TestUser): void {
  mkdirSync(authDirectory, { recursive: true });

  writeFileSync(testUserFile, JSON.stringify(user, null, 2));
}

export function readTestUser(): TestUser {
  return JSON.parse(readFileSync(testUserFile, 'utf-8'));
}