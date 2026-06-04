import { chromium, FullConfig } from '@playwright/test';
import { ENV } from './config/env';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();


  const username = ENV.USERNAME;
  const password = ENV.PASSWORD;

  await page.goto(ENV.BASE_URL);
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