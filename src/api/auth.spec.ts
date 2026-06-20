import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { generateRandomUser } from '../utils/faker';
import { createAccount, verifyLogin } from './authApi';

dotenv.config();

const registeredUser = generateRandomUser();

test.describe('API Authentication', () => {
  test('Should create a new user account', async ({ request }) => {
    const response = await createAccount(request, registeredUser);
    const body = await response.json();

    console.log('Create Account response body:', body);

    expect(response.status()).toBe(200);
    expect(body.message).toBe('User created!');
  });

  test('Should login with env user credentials', async ({ request }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    if (!email || !password) {
      throw new Error('Missing TEST_USER_EMAIL or TEST_USER_PASSWORD in .env');
    }

    const response = await verifyLogin(request, email, password);
    const body = await response.json();

    console.log('Verify Login response body:', body);

    expect(response.status()).toBe(200);
  });
});
