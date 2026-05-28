import { test, expect } from '@playwright/test';
import { IndividualProduct } from '../../pages/individualProduct';


let product : IndividualProduct

test.beforeEach(async ({ page }) => {
  product = new IndividualProduct(page)
  await product.openProductPage()
})

test('User should be able to see products on product page', async ({ page }) => {
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
})

test('User see the first product link enabled', async ({ page }) => {
await product.clickOnFirstProduct()
await expect(page).toHaveURL(/inventory-item\.html\?id=/)
})

test('User see the description after clicking on first product link', async ({ page }) => {
await product.clickOnFirstProduct()
await expect(page).toHaveURL(/inventory-item\.html\?id=/)
const productDesc = page.locator('[data-test="inventory-item-desc"]')
await expect(productDesc).toContainText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.")
})