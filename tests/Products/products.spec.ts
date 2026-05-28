import { test, expect } from '@playwright/test';


test('Product page URL validation', async ({ page }) => {
  await page.goto('/inventory.html');
  await expect(page).toHaveURL(/inventory.html/);
});

test('Product title check', async ({ page }) => {
  await page.goto('/inventory.html');
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('Product page burger button check', async ({ page }) => {
 await page.goto('/inventory.html');
 const burger =  page.locator("#react-burger-menu-btn")
 expect(burger).toBeVisible()
 expect(page.locator(".bm-menu-wrap")).toHaveAttribute("aria-hidden","true")
 await burger.click()
 expect(page.locator(".bm-menu-wrap")).toHaveAttribute("aria-hidden","false")
 await expect(page.locator(".bm-item-list")).toBeVisible();
 await expect(page.locator("#inventory_sidebar_link"))
  .toBeVisible();
await expect(page.locator("#logout_sidebar_link"))
  .toBeVisible();
await expect(page.locator(".bm-item-list"))
  .toContainText("All Items");
await expect(page.locator(".bm-item-list"))
  .toContainText("Logout");
})