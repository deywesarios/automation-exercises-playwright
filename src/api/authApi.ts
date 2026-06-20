import type { APIRequestContext } from '@playwright/test';
import type { GeneratedUser } from '../utils/faker';

export async function createAccount(request: APIRequestContext, user: GeneratedUser, emailOverride?: string) {
  const birthDate = user.dateOfBirth;
  const payload = new URLSearchParams({
    name: user.fullName,
    email: emailOverride || user.email,
    password: user.password,
    title: user.title,
    birth_date: String(birthDate.getDate()),
    birth_month: String(birthDate.getMonth() + 1),
    birth_year: String(birthDate.getFullYear()),
    firstname: user.firstName,
    lastname: user.lastName,
    company: user.company,
    address1: user.address,
    country: user.country,
    zipcode: user.zipcode,
    state: user.state,
    city: user.city,
    mobile_number: user.mobileNumber,
  });

  return request.post(`${process.env.BASE_URL}/api/createAccount`, {
    data: payload.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function verifyLogin(
  request: APIRequestContext,
  email: string,
  password: string
) {
  const payload = new URLSearchParams({
    email,
    password,
  });

  return request.post(`${process.env.BASE_URL}/api/verifyLogin`, {
    data: payload.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function invalidCredentials(
  request: APIRequestContext,
  email?: any,
  password?: any
) {
  const payload = new URLSearchParams({
    email,
    password,
  });

  return request.post(`${process.env.BASE_URL}/api/verifyLogin`, {
    data: payload.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function missingEmail(
  request: APIRequestContext,
  password?: any
) {
  const payload = new URLSearchParams({
    password,
  });

  return request.post(`${process.env.BASE_URL}/api/verifyLogin`, {
    data: payload.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function getAccountDetails(
  request: APIRequestContext,
  email: string
) {
  return request.get(`${process.env.BASE_URL}/api/getUserDetailByEmail`, {
    params: { email },
  });
}