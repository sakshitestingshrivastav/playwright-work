import { expect, Page, Locator } from '@playwright/test';

export class About {

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

  async clickOnBurger(){
    const burger =  this.page.locator("#react-burger-menu-btn")
    expect(burger).toBeVisible()
    expect(this.page.locator(".bm-menu-wrap")).toHaveAttribute("aria-hidden","true")
    await burger.click()
  }

  async clickOnAboutLink(){
    await expect(this.page.locator(".bm-item-list"))
      .toContainText("About");
    const aboutLink =  this.page.locator("a").filter({ hasText: "About" })
    await aboutLink.click()
  }
}