import { test,expect } from '@playwright/test'

test("Verify user is able to see Add to Cart button",async({page})=>{
await page.goto('/inventory.html');
await expect(page).toHaveURL(/inventory.html/);
expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').first()).toBeVisible()
expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeEnabled()
})

test("Verify user is able to click on Add to Cart button",async({page})=>{
await page.goto('/inventory.html');
expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').first()).toBeVisible()
expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').first()).toBeEnabled()
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').first()).not.toBeVisible()
})

test("Verify user is able to see Remove button at the place of Add to Cart button",async({page})=>{
await page.goto('/inventory.html');
expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').first()).toBeVisible()
expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').first()).toBeEnabled()
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
expect(page.getByText("Remove").first()).toBeVisible()
})

test("User should be able to see the count of product added on the cart link when click on Add to Cart button",async({page})=>{
await page.goto('/inventory.html');
expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').first()).toBeVisible()
expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').first()).toBeEnabled()
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
expect(page.getByText("Remove").first()).toBeVisible()
const count = await page.locator('[data-test="shopping-cart-badge"]')
expect(count).toBeVisible()
expect(count).toHaveText('1')
})

test("Clicking on Remove button should remove the count showing on the Cart link",async({page})=>{
await page.goto('/inventory.html');
expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').first()).toBeVisible()
expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').first()).toBeEnabled()
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
const count = await page.locator('[data-test="shopping-cart-badge"]')
expect(count).toBeVisible()
expect(count).toHaveText('1')
expect(page.getByText("Remove").first()).toBeVisible()
await page.getByText("Remove").first().click()
expect(count).not.toBeVisible()
})