import { test,expect } from '@playwright/test'

test("Verify that user is able to see Logout link in side bar link",async({page})=>{
await page.goto('/inventory.html');
await expect(page).toHaveURL(/inventory.html/);
const burger =  page.locator("#react-burger-menu-btn")
expect(burger).toBeVisible()
expect(page.locator(".bm-menu-wrap")).toHaveAttribute("aria-hidden","true")
await burger.click()
await expect(page.locator(".bm-item-list"))
  .toContainText("Logout");
})

test("Verify that user is able to click on Logout link in side bar",async({page})=>{
await page.goto('/inventory.html');
await expect(page).toHaveURL(/inventory.html/);
const burger =  page.locator("#react-burger-menu-btn")
expect(burger).toBeVisible()
expect(page.locator(".bm-menu-wrap")).toHaveAttribute("aria-hidden","true")
await burger.click()
await expect(page.locator(".bm-item-list"))
  .toContainText("Logout");
const Logout = page.getByText("Logout")
await Logout.click()
expect(page).toHaveURL(process.env.SWAG_BASE_URL!);
await expect(page).not.toHaveURL(process.env.SWAG_PRODUCT_PAGE_URL!);
})