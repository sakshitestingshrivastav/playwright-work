import { test,expect } from '@playwright/test'
import { AddToCart } from '../../pages/Cart';
import { generateRandomString , generateNumber } from '../../utils/helper';

let cart : AddToCart
test.beforeEach(async ({ page }) => {
cart = new AddToCart(page)
await cart.openProductPage()
})

test("Verify user is able to see that checkout button is visible on UI",async({page})=>{
await cart.clickOnCart()
await page.locator('[data-test="shopping-cart-link"]').click()
expect(page.locator('[data-test="checkout"]')).toBeVisible()
expect(page.locator('[data-test="checkout"]')).toBeEnabled()
})  

test("Verify user is able to click on checkout button and verify it is clicked",async({page})=>{
await cart.clickOnCart()
await page.locator('[data-test="shopping-cart-link"]').click()
await page.locator('[data-test="checkout"]').click()
expect(page.locator('[data-test="checkout"]')).toBeHidden()
})

test("Verify user is able to see checkout form available on checkout page",async({page})=>{
await cart.clickOnCart()
await page.locator('[data-test="shopping-cart-link"]').click()
await page.locator('[data-test="checkout"]').click()
await expect(page.getByPlaceholder('First Name')).toBeVisible()
await expect(page.getByPlaceholder('Last Name')).toBeVisible()
await expect(page.getByPlaceholder('Zip/Postal Code')).toBeVisible()
})

test("Verify user is see errors on the field if user clicks on continue button without entering any values in the fields",async({page})=>{
await cart.clickOnCart()
await page.locator('[data-test="shopping-cart-link"]').click()
await page.locator('[data-test="checkout"]').click()
await expect(page.getByPlaceholder('First Name')).toBeVisible()
await page.locator('[data-test="continue"]').click()
await expect(page.getByText('Error: First Name is required')).toBeVisible()
})

test("Verify user is redirected to the previous page if clicked on cancel button",async({page})=>{
await cart.clickOnCart()
await page.locator('[data-test="shopping-cart-link"]').click()
await page.locator('[data-test="checkout"]').click()
await expect(page.getByPlaceholder('First Name')).toBeVisible()
await page.locator('[data-test="cancel"]').click()
await expect(page.url()).toContain('https://www.saucedemo.com/cart.html')
})

test("Verify user is enter some data in the first name field",async({page})=>{
await cart.clickOnCart()
await page.locator('[data-test="shopping-cart-link"]').click()
await page.locator('[data-test="checkout"]').click()
await expect(page.getByPlaceholder('First Name')).toBeVisible()
await page.getByPlaceholder('First Name').fill('John')
expect(page.getByPlaceholder('First Name')).toHaveValue('John')
await page.getByPlaceholder('First Name').clear()
expect(page.getByPlaceholder('First Name')).not.toHaveValue('John')
const str = generateRandomString(20)
await page.getByPlaceholder('First Name').fill(str)
expect(page.getByPlaceholder('First Name')).toHaveValue(str)
})

test("Verify user is enter some data in the last name field",async({page})=>{
await cart.clickOnCart()
await page.locator('[data-test="shopping-cart-link"]').click()
await page.locator('[data-test="checkout"]').click()
await expect(page.getByPlaceholder('Last Name')).toBeVisible()
await page.getByPlaceholder('Last Name').fill('Doe')
expect(page.getByPlaceholder('Last Name')).toHaveValue('Doe')
await page.getByPlaceholder('Last Name').clear()
expect(page.getByPlaceholder('Last Name')).not.toHaveValue('Doe')
const str = generateRandomString(20)
await page.getByPlaceholder('Last Name').fill(str)
expect(page.getByPlaceholder('Last Name')).toHaveValue(str)
})

test("Verify user is enter some data in the zip code field",async({page})=>{
await cart.clickOnCart()
await page.locator('[data-test="shopping-cart-link"]').click()
await page.locator('[data-test="checkout"]').click()
await expect(page.getByPlaceholder('First Name')).toBeVisible()
await page.getByPlaceholder('Zip/Postal Code').fill('12345')
expect(page.getByPlaceholder('Zip/Postal Code')).toHaveValue('12345')
await page.getByPlaceholder('Zip/Postal Code').clear()
expect(page.getByPlaceholder('Zip/Postal Code')).not.toHaveValue('12345')
const str = generateNumber(20)
await page.getByPlaceholder('Zip/Postal Code').fill(str)
expect(page.getByPlaceholder('Zip/Postal Code')).toHaveValue(str)
})

test("Verify user is able to to checkout and continue successfully with valid details",async({page})=>{
await cart.clickOnCart()
await page.locator('[data-test="shopping-cart-link"]').click()
await page.locator('[data-test="checkout"]').click()
await expect(page.getByPlaceholder('First Name')).toBeVisible()
await page.getByPlaceholder('First Name').fill('John')
await page.getByPlaceholder('Last Name').fill('Doe')
await page.getByPlaceholder('Zip/Postal Code').fill('12345')
await page.locator('[data-test="continue"]').click()
await expect(page.url()).toContain('/checkout-step-two.html')
})

test("Verify user is able to to continue and confirm the order successfully with valid details",async({page})=>{
await cart.clickOnCart()
await page.locator('[data-test="shopping-cart-link"]').click()
await page.locator('[data-test="checkout"]').click()
await expect(page.getByPlaceholder('First Name')).toBeVisible()
await page.getByPlaceholder('First Name').fill('John')
await page.getByPlaceholder('Last Name').fill('Doe')
await page.getByPlaceholder('Zip/Postal Code').fill('12345')
await page.locator('[data-test="continue"]').click()
await expect(page.url()).toContain('/checkout-step-two.html')
await page.locator('[data-test="finish"]').click()
await expect(page.url()).toContain('/checkout-complete.html')
await expect(page.getByText('Thank you for your order!')).toBeVisible()
await expect(page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBeVisible()
await expect(page.getByText('Checkout: Complete!')).toBeVisible()
})
