import { test , expect } from '@playwright/test';
import { Login } from '../pages/Login';
import { generateRandomString } from '../utils/helper';
import { validUsername} from '../test-data/validCredentials'

let username : string | undefined
let password : string | undefined

let loginPage : Login

test.beforeEach(async ({ page }) => {
  loginPage = new Login(page);
  await loginPage.open();
})

test('Verify login page URL', async ({ page }) => {
  await expect(page).toHaveURL(/saucedemo/);
});

test('Verify login page text', async ({ page }) => {
  await loginPage.verifySwagLabsVisible();
});

test('Verify login with valid test data credentials', async ({ page }) => {
  await loginPage.verifySwagLabsVisible();
  await loginPage.login(validUsername[0], process.env.SWAG_PASSWORD!);
});

test('Extract username and password from login page and enter the same credentials and do login', async ({ page }) => {
  const usernameBlock = await page.locator('#login_credentials').innerText();
  const passwordBlock = await page.locator('.login_password').innerText();
  const usernameLines = usernameBlock.split('\n');
  const passwordLines = passwordBlock.split('\n');
  username = usernameLines.find(line => line.includes('standard_user'))?.trim();
  password = passwordLines.find(line => line.includes('secret_sauce'))?.trim();
if (!username || !password) {
    throw new Error('Username or password not found on login page');
  }
  await loginPage.login(username, password);
});

test('Should be able to see error message if invalid crendentials are entered for login', async ({ page }) => {
  await loginPage.verifySwagLabsVisible();
  await loginPage.login(generateRandomString(10), generateRandomString(10));
  await expect(page.getByText("Username and password do not match any user in this service")).toBeVisible()
})

test('Should be able to see error message if crendentials are not entered for login', async ({ page }) => {
  await loginPage.verifySwagLabsVisible();
  await loginPage.login("", "");
  await expect(page.getByText("Username is required")).toBeVisible()
})

test('Should be able to see error message if password is not entered for login', async ({ page }) => {
  await loginPage.verifySwagLabsVisible();
  await loginPage.login(generateRandomString(10), "");
  await expect(page.getByText("Password is required")).toBeVisible()
})