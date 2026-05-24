import { test } from '../fixtures/testFixtures';
import { generateRandomUser } from '../../src/utils/faker';

const user = generateRandomUser();
const fullName = process.env.TEST_USER_FULL_NAME!;

test.beforeEach(async ({ loginPage }) => {
    await loginPage.validateIsOnLoginPage();
});

test('Fill signup form and create account', async ({ loginPage }) => {
    await loginPage.fillSignupFirstForm(user);
    await loginPage.validateIsOnSignupPage();
    await loginPage.selectGender(user.gender);
    await loginPage.validateFullNameIsTheSame(user.fullName);
    await loginPage.validateEmailIsTheSame(user.email);
    await loginPage.fillRegistrationForm(
      user.password,
      user.dateOfBirth,
      user.firstName,
      user.lastName,
      user.company, 
      user.address,
      user.country,
      user.state, 
      user.city, 
      user.zipcode, 
      user.mobileNumber
    );
    await loginPage.submitRegistration();
    await loginPage.validateAccountCreated();
    await loginPage.continueToHome();
    await loginPage.validateIsLoggedIn(user.fullName);

});

test('Login with valid user', async ({ loginPage, homePage }) => {
    const email = process.env.TEST_USER_EMAIL!;
    const password = process.env.TEST_USER_PASSWORD!;
    
    await loginPage.login(email, password);
    await homePage.validateHomePageTitle();
    await loginPage.validateIsLoggedIn(fullName);
});

test('Login with invalid user', async ({ loginPage }) => {
    await loginPage.login(user.invalidEmail, user.password);
    await loginPage.validateLoginError();
});

test('Signup with already registered email', async ({ loginPage }) => {
    const email = process.env.TEST_USER_EMAIL!;

    await loginPage.fillSignupFirstForm({ fullName, email });
    await loginPage.validateSignupEmailError();
});