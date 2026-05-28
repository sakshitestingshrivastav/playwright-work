import { test,expect } from '@playwright/test'
import { Cart } from '../../pages/Cart';

let cart : Cart

test.beforeEach(async ({ page }) => {
cart = new Cart(page)
await cart.openProductPage()
})

test("Verify that clicking on cart",async({page})=>{
await cart.clickOnCart()
})

test("Should be able to see Your Cart title on cart page",async({page})=>{
await cart.clickOnCart()
expect(page.locator('[data-test="title"]')).toBeVisible()
})

test("Verify that clicking on continue shopping button again redirect user to products page",async({page})=>{
await cart.clickOnCart()
expect(page.locator('[data-test="title"]')).toBeVisible()
expect(page.locator("#continue-shopping")).toBeVisible()
await page.locator("#continue-shopping").click()
await expect(page).toHaveURL(/inventory.html/);
await expect(page).not.toHaveURL(/cart.html/);
})