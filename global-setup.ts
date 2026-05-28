import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();


  const username = process.env.SWAG_USERNAME;
  const password = process.env.SWAG_PASSWORD;

    if (!process.env.SWAG_BASE_URL) {
      throw new Error('Missing SWAG_USERNAME or SWAG_PASSWORD');
    }
  await page.goto(process.env.SWAG_BASE_URL);

  
    if (!username || !password) {
      throw new Error('Missing SWAG_USERNAME or SWAG_PASSWORD');
    }

  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('#login-button').click();

  await page.waitForURL('**/inventory.html');

  await page.context().storageState({
    path: 'storageState.json',
  });

  await browser.close();
}

export default globalSetup;