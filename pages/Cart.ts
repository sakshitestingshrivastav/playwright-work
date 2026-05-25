import { expect, Page, Locator } from '@playwright/test';

export class Cart {

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

    async clickOnCart() {
    await this.page.locator(".shopping_cart_link").click()
    await expect(this.page).toHaveURL(/cart.html/);
    expect(this.page.locator('[data-test="title"]')).toBeVisible()
  }
}

export class AddToCart extends Cart {

    async addToCart() {
    expect(this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').first()).toBeVisible()
    expect(this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeEnabled()
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    }

    async remove(){
    expect(this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').first()).toBeVisible()
    expect(this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').first()).toBeEnabled()
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    const count = await this.page.locator('[data-test="shopping-cart-badge"]')
    expect(count).toBeVisible()
    expect(count).toHaveText('1')
    expect(this.page.getByText("Remove").first()).toBeVisible()
    await this.page.getByText("Remove").first().click()
    }
}