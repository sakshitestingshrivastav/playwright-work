import { test,expect } from '@playwright/test'
import { Logout } from '../pages/Logout';

test("Verify that user is able to see Logout link in side bar link",async({page})=>{
const logout = new Logout(page);
await logout.openProductPage();
const burger =  page.locator("#react-burger-menu-btn")
expect(burger).toBeVisible()
expect(page.locator(".bm-menu-wrap")).toHaveAttribute("aria-hidden","true")
await burger.click()
await expect(page.locator(".bm-item-list"))
  .toContainText("Logout");
})

test("Verify that user is able to click on Logout link in side bar",async({page})=>{
const logout = new Logout(page);
await logout.openProductPage();
await logout.logout();
expect(page).toHaveURL(process.env.SWAG_BASE_URL!);
await expect(page).not.toHaveURL(process.env.SWAG_PRODUCT_PAGE_URL!);
})