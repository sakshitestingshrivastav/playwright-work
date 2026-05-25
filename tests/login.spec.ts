import { test , expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { generateRandomString } from '../utils/helper';

  let username : string | undefined
  let password : string | undefined

test('Verify login page URL', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await expect(page).toHaveURL(/saucedemo/);
});

test('Verify login page text', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.verifySwagLabsVisible();
});

test('Extract username and password from login page and enter the same credentials and do login', async ({ page }) => {
  await page.goto('/');
  const usernameBlock = await page.locator('#login_credentials').innerText();
  const passwordBlock = await page.locator('.login_password').innerText();
  const usernameLines = usernameBlock.split('\n');
  const passwordLines = passwordBlock.split('\n');
  username = usernameLines.find(line => line.includes('standard_user'))?.trim();
  password = passwordLines.find(line => line.includes('secret_sauce'))?.trim();

if (!username || !password) {
    throw new Error('Username or password not found on login page');
  }

  await page.locator('[data-test="username"]').fill(username)
  await expect (page.locator('[data-test="username"]')).toHaveValue(username);
  await page.locator('[data-test="password"]').fill(password)
  await expect (page.locator('[data-test="password"]')).toHaveValue(password);
  await page.locator("#login-button").click()

});


test('Should be able to see error message if invalid crendentials are entered for login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.verifySwagLabsVisible();
  await page.locator('[data-test="username"]').fill(generateRandomString(10))
  await page.locator('[data-test="password"]').fill(generateRandomString(10))
  await page.locator("#login-button").click()
  await expect(page.getByText("Username and password do not match any user in this service")).toBeVisible()
})

test('Should be able to see error message if crendentials are not entered for login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.verifySwagLabsVisible();
  await page.locator("#login-button").click()
  await expect(page.getByText("Username is required")).toBeVisible()
})

test('Should be able to see error message if password is not entered for login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.verifySwagLabsVisible();
  await page.locator('[data-test="username"]').fill(generateRandomString(10))
  await page.locator("#login-button").click()
  await expect(page.getByText("Password is required")).toBeVisible()
})