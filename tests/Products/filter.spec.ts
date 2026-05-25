import { test, expect } from '@playwright/test';

test('User should be able to see all the filter options when clicked on funnel icon', async ({ page }) => {
  await page.goto('/inventory.html');
  await expect(page).toHaveURL(/inventory.html/);
  expect(page.locator('[data-test="product-sort-container"]')).toBeVisible()
  await page.locator('[data-test="product-sort-container"]').click()
  expect (page.getByText("Price (low to high)")).toBeVisible()
  expect (page.getByText("Price (high to low)")).toBeVisible()
});

test('User should be able to click on the filter option', async ({ page }) => {
  await page.goto('/inventory.html');
  await expect(page).toHaveURL(/inventory.html/);
  await page.locator('[data-test="product-sort-container"]').click()
  await page.getByText("Price (high to low)").click()
});