import {test, expect} from "@playwright/test"

test("Verify that on sauce labs main page the footer is visible",async({page})=>{
    await page.goto(process.env.SWAG_BASE_URL!)
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('footer')).toBeVisible()
})

test("Verify that on sauce labs main page the footer contains the correct text",async({page})=>{
    await page.goto(process.env.SWAG_BASE_URL!)
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.getByText('Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')).toBeVisible()
})

test("Verify that in footer the twitter link is visible and hover over twitter sign we see the link",async({page})=>{
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('footer')).toBeVisible()
    const twitterLink = page.locator('footer a[href="https://twitter.com/saucelabs"]')
    await twitterLink.scrollIntoViewIfNeeded()
    await expect(twitterLink).toBeVisible()
    await twitterLink.hover()
})

test("Verify that in footer the facebook link is visible and hover over facebook sign we see the link",async({page})=>{
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('footer')).toBeVisible()
    const facebookLink = page.locator('footer a[href="https://www.facebook.com/saucelabs"]')
    await facebookLink.scrollIntoViewIfNeeded()
    await expect(facebookLink).toBeVisible()
    await facebookLink.hover()
})

test("Verify that in footer the linkedin link is visible and hover over linkedin sign we see the link",async({page})=>{
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('footer')).toBeVisible()
    const linkedinLink = page.locator('footer a[href="https://www.linkedin.com/company/sauce-labs/"]')
    await linkedinLink.scrollIntoViewIfNeeded()
    await expect(linkedinLink).toBeVisible()
    await linkedinLink.hover()
})

test("Verify that click on twitter footer link redirect user to twitter page",async({page})=>{
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('footer')).toBeVisible()
    const twitterLink = page.locator('footer a[href="https://twitter.com/saucelabs"]')
    await twitterLink.scrollIntoViewIfNeeded()
    await twitterLink.click()
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        twitterLink.click()
    ])
    await expect(newPage).toHaveURL(/twitter\.com\/saucelabs|x\.com\/saucelabs/)
})

test("Verify that click on facebook footer link redirect user to facebook page",async({page})=>{
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('footer')).toBeVisible()
    const facebookLink = page.locator('footer a[href="https://www.facebook.com/saucelabs"]')
    await facebookLink.scrollIntoViewIfNeeded()
    await facebookLink.click()
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        facebookLink.click()
    ])
    await expect(newPage).toHaveURL(/facebook\.com\/saucelabs/)
})

test("Verify that click on linkedin footer link redirect user to linkedin page",async({page})=>{
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('footer')).toBeVisible()
    const linkedinLink = page.locator('footer a[href="https://www.linkedin.com/company/sauce-labs/"]')
    await linkedinLink.scrollIntoViewIfNeeded()
    await linkedinLink.click()
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        linkedinLink.click()
    ])
    await expect(newPage).toHaveURL(/linkedin\.com\/company\/sauce-labs/)
})