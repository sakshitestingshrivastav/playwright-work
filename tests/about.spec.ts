import { test, expect } from '@playwright/test';
import { ENV } from "../config/env";
import { About } from '../pages/About';

let about : About

test.beforeEach(async ({ page }) => {
  about = new About(page)
  await about.openProductPage()
})

test('Product page URL validation', async ({ page }) => {
  await expect(page).toHaveURL(/inventory.html/);
});

test('Product page title check', async ({ page }) => {
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test("Verify that user is able to see About link in side bar link..",async({page})=>{
await about.clickOnBurger()
await expect(page.locator(".bm-item-list"))
  .toContainText("About");
})

test("Verify that user is able to click on About link in side bar",async({page})=>{
await about.clickOnBurger()
await about.clickOnAboutLink()
expect(page).toHaveURL(ENV.SAUCE_LABS_URL);
await expect(page).not.toHaveURL(ENV.PRODUCT_URL);
})

test("Verify that user is able to is able to see heading of Sauce labs page",async({page})=>{
await about.clickOnBurger()
await about.clickOnAboutLink()
expect(page).toHaveURL(ENV.SAUCE_LABS_URL);
await expect(page).not.toHaveURL(ENV.PRODUCT_URL);
await expect(page.getByText("The World's Only Full-Lifecycle AI-Quality Platform")).toBeVisible();
})

test("Verify that user is able to see login button on Sauce labs page",async({page})=>{
await about.clickOnBurger()
await about.clickOnAboutLink()
expect(page).toHaveURL(ENV.SAUCE_LABS_URL);
await expect(page).not.toHaveURL(ENV.PRODUCT_URL);
await expect(page.getByRole("button",{name : "Log In"})).toBeVisible();
await expect(page.getByRole("button",{name : "Log In"})).toBeEnabled();
})

test("Verify that user is able to see sign up button on Sauce labs page",async({page})=>{
await about.clickOnBurger()
await about.clickOnAboutLink()
expect(page).toHaveURL(ENV.SAUCE_LABS_URL);
await expect(page).not.toHaveURL(ENV.PRODUCT_URL);
await expect(page.locator(".MuiStack-root.css-63esow").getByRole("button",{name : "Sign up for free"})).toBeVisible();
await expect(page.locator(".MuiStack-root.css-63esow").getByRole("button",{name : "Sign up for free"})).toBeEnabled();
})

test("Verify that user is able to see book a demo button on Sauce labs page",async({page})=>{
await about.clickOnBurger()
await about.clickOnAboutLink()
expect(page).toHaveURL(ENV.SAUCE_LABS_URL);
await expect(page).not.toHaveURL(ENV.PRODUCT_URL);
await expect(page.getByRole("button",{name : "Book a demo"})).toBeVisible();
await expect(page.getByRole("button",{name : "Book a demo"})).toBeEnabled();
})