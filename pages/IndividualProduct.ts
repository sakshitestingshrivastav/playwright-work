import { expect, Page, Locator } from '@playwright/test';

export class IndividualProduct {

  readonly page: Page;
  readonly swagText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.swagText = page.getByText(/Swag Labs/i);
  }

  async openProductPage() {
  await this.page.goto('/inventory.html');
  await expect(this.page).toHaveURL(/inventory.html/);
  }

  async clickOnFirstProduct(){
const backpackLink = this.page.locator('[data-test="item-4-title-link"]')
await expect(backpackLink).toBeVisible()
await backpackLink.hover()
await backpackLink.click()
  }
}