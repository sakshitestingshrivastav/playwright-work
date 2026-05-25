import { test,expect } from '@playwright/test'
import { Cart } from '../../pages/Cart';

test("Verify that clicking on cart",async({page})=>{
const cart = new Cart(page)
await cart.openProductPage()
await cart.clickOnCart()
})

test("Should be able to see Your Cart title on cart page",async({page})=>{
const cart = new Cart(page)
await cart.openProductPage()
await cart.clickOnCart()
expect(page.locator('[data-test="title"]')).toBeVisible()
})

test("Verify that clicking on continue shopping button again redirect user to products page",async({page})=>{
const cart = new Cart(page)
await cart.openProductPage()
await cart.clickOnCart()
expect(page.locator('[data-test="title"]')).toBeVisible()
expect(page.locator("#continue-shopping")).toBeVisible()
await page.locator("#continue-shopping").click()
await expect(page).toHaveURL(/inventory.html/);
await expect(page).not.toHaveURL(/cart.html/);
})