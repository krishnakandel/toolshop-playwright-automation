import { Locator, Page } from '@playwright/test';
import { TestUser } from '../utils/testUser';

export class RegistrationPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dobInput: Locator;

  readonly countrySelect: Locator;
  readonly postalCodeInput: Locator;
  readonly houseNumberInput: Locator;

  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;

  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;

  readonly registerButton: Locator;
  readonly registerError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.getByTestId('first-name');
    this.lastNameInput = page.getByTestId('last-name');
    this.dobInput = page.getByTestId('dob');

    this.countrySelect = page.getByTestId('country');
    this.postalCodeInput = page.getByTestId('postal_code');
    this.houseNumberInput = page.getByTestId('house_number');

    this.streetInput = page.getByTestId('street');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');

    this.phoneInput = page.getByTestId('phone');
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');

    this.registerButton = page.getByTestId('register-submit');
    this.registerError = page.getByTestId('register-error');
  }

  async goto() {
    await this.page.goto('/auth/register');
  }

  async register(user: TestUser) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.dobInput.fill(user.dob);

    /*
     * Toolshop performs a postcode lookup after
     * country + postcode + house number are entered.
     * Start listening before filling those fields.
     */
    const postcodeLookup = this.page
      .waitForResponse(
        response =>
          response.url().includes('/postcode-lookup') &&
          response.request().method() === 'GET',
        { timeout: 5000 },
      )
      .catch(() => null);

    await this.countrySelect.selectOption(user.country);
    await this.postalCodeInput.fill(user.postalCode);
    await this.houseNumberInput.fill(user.houseNumber);

    // Wait for postcode lookup if it occurs.
    await postcodeLookup;

    /*
     * Fill these explicitly so account creation
     * still works even if postcode lookup fails.
     */
    await this.streetInput.fill(user.street);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);

    await this.phoneInput.fill(user.phone);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);

    await this.registerButton.click();
  }
}