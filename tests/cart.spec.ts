import { test,expect } from '@playwright/test'

test("Verify that clicking on cart",async({page})=>{
await page.goto('/inventory.html');
await expect(page).toHaveURL(/inventory.html/);
await page.locator(".shopping_cart_link").click()
await expect(page).toHaveURL(/cart.html/);
})

test("Should be able to see Your Cart title on cart page",async({page})=>{
await page.goto('/inventory.html');
await expect(page).toHaveURL(/inventory.html/);
await page.locator(".shopping_cart_link").click()
await expect(page).toHaveURL(/cart.html/);
expect(page.locator('[data-test="title"]')).toBeVisible()
})

test("Verify that clicking on continue shopping button again redirect user to products page",async({page})=>{
await page.goto('/inventory.html');
await page.locator(".shopping_cart_link").click()
await expect(page).toHaveURL(/cart.html/);
expect(page.locator('[data-test="title"]')).toBeVisible()
expect(page.locator("#continue-shopping")).toBeVisible()
await page.locator("#continue-shopping").click()
await expect(page).toHaveURL(/inventory.html/);
await expect(page).not.toHaveURL(/cart.html/);
})