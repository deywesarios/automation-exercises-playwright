import { test, expect } from '@playwright/test';
import { generateRandomUser } from '../../utils/faker';
import { 
  createAccount,
  verifyLogin,
  invalidCredentials,
  missingEmail,
  getAccountDetails
} from '../../api/authApi';

const registeredUser = generateRandomUser();
const email = process.env.TEST_USER_EMAIL;
const password = process.env.TEST_USER_PASSWORD;
const fullName = process.env.TEST_USER_FULL_NAME;

test.describe('API Authentication', () => {
  test('User Registration', async ({ request }) => {
    const response = await createAccount(request, registeredUser);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(201);
    expect(body.message).toBe('User created!');
  });

  test('Successful Login', async ({ request }) => {
    
    if (!email || !password) {
      throw new Error('Missing TEST_USER_EMAIL or TEST_USER_PASSWORD');
    }

    const response = await verifyLogin(request, email, password);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
  });

  test('Missing Credentials', async ({ request }) => {

    if(!password) {
      throw new Error('Missing TEST_USER_PASSWORD');
    }

    const response = await missingEmail(request, password);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
  });

  test('Invalid Credentials', async ({ request }) => {
    const invalidPassword = 'wrongpassword123';
    const response = await invalidCredentials(request, email, invalidPassword);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  });

  test('Validate that the email is already registered', async ({ request }) => {
    const response = await createAccount(request, registeredUser, email);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Email already exists!');
  });

  test('Get Account Details', async ({ request }) => {
    if (!email) {
      throw new Error('Missing TEST_USER_EMAIL');
    }
    
    const response = await getAccountDetails(request, email);
    const body = await response.json();
    
    console.log('Account Details:', body);

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.user.name).toBe(fullName);
  });

});
