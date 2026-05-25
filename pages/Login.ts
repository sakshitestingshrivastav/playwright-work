import { expect, Page, Locator } from '@playwright/test';

export class Login {

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

  async login(username: string, password: string) {
  await this.page.locator('[data-test="username"]').fill(username);
  await expect(this.page.locator('[data-test="username"]')).toHaveValue(username);
  await this.page.locator('[data-test="password"]').fill(password);
  await expect(this.page.locator('[data-test="password"]')).toHaveValue(password);
  await this.page.locator('#login-button').click();
}
}