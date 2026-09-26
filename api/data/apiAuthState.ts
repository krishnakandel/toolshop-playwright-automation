import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface ApiAuthState {
  accessToken: string;
}

const authDirectory = resolve('.auth');
const apiAuthFile = resolve('.auth/api-auth.json');

export function saveApiAuthState(authState: ApiAuthState): void {
  mkdirSync(authDirectory, { recursive: true });
  writeFileSync(apiAuthFile, JSON.stringify(authState, null, 2));
}

export function readApiAuthState(): ApiAuthState {
  return JSON.parse(readFileSync(apiAuthFile, 'utf-8'));
}