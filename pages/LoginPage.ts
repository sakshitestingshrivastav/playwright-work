import { Page, Locator } from '@playwright/test';

export class LoginPage {

  readonly page: Page;
  readonly swagText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.swagText = page.getByText(/Swag Labs/i);
  }

  async open() {
    await this.page.goto('/');
  }

  async verifySwagLabsVisible() {
    await this.swagText.isVisible();
  }
}