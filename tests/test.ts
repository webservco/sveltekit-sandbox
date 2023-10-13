import { expect, test } from '@playwright/test';

/**
 * Error when running `npm run test:integration`:
 * Error: browserType.launch: Executable doesn't exist at /home/radu/.cache/ms-playwright/chromium-1080/chrome-linux/chrome
 * Solution: `npx playwright install`
 * Reference: https://github.com/microsoft/playwright#manually
 */

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Hoard-R' })).toBeVisible();
});
