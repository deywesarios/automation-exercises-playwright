import { faker } from '@faker-js/faker';

export interface GeneratedUser {
    gender: 'male' | 'female';
    title: 'Mr' | 'Mrs' | 'Miss';
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    company: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
    invalidEmail: string;
}

function generateRandomUser(): GeneratedUser {
    const gender = faker.helpers.arrayElement(['male', 'female']) as 'male' | 'female';
    const title = faker.helpers.arrayElement(['Mr', 'Mrs', 'Miss']) as 'Mr' | 'Mrs' | 'Miss';
    const firstName = faker.person.firstName(gender);
    const lastName = faker.person.lastName();
    const email = `${firstName}.${lastName}.${faker.string.alphanumeric(6)}@example.com`.toLowerCase();
    const dateOfBirth = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
    const company = faker.company.name();
    const address = faker.location.streetAddress();
    const allowedCountries = [
        'India',
        'United States',
        'Canada',
        'Australia',
        'Israel',
        'New Zealand',
        'Singapore'
    ];
    const country = faker.helpers.arrayElement(allowedCountries);
    const state = faker.location.state();
    const city = faker.location.city();
    const zipcode = faker.location.zipCode();
    const mobileNumber = faker.phone.number();
    const invalidEmail = faker.internet.email();

    return {
        gender,
        title,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        email,
        password: faker.internet.password({ length: 10, numbers: true, symbols: true, uppercase: true, lowercase: true }),
        dateOfBirth,
        company,
        address,
        country,
        state,
        city,
        zipcode,
        mobileNumber,
        invalidEmail,
    };
}

export { generateRandomUser };