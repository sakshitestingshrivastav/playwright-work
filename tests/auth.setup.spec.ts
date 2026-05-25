import { test } from '@playwright/test';

test('Login and save session', async ({ page }) => {

  await page.goto('/');

  const username1 = process.env.SWAG_USERNAME!;
  const password1 = process.env.SWAG_PASSWORD!;

  console.log(username1)
  console.log(password1)

  await page.locator('[data-test="username"]').fill(username1);
  await page.locator('[data-test="password"]').fill(password1);
  await page.locator('#login-button').click();

  await page.waitForURL('**/inventory.html');
  // save session
  await page.context().storageState({ path: 'storageState.json' });

});