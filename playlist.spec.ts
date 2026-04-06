import { test, expect } from '@playwright/test';

test('should filter tracks by search input', async ({ page }) => {
  await page.goto('https://vite-react-alpha-lemon.vercel.app/');
  await page.waitForLoadState('networkidle');

  const searchInput = page.getByRole('textbox').first();

  await searchInput.click();
  await searchInput.fill('Summer');

  await expect(page.getByText('Summer Breeze')).toBeVisible();
  await expect(page.getByText('Autumn Leaves')).not.toBeVisible();
  await expect(page.getByText('Winter Winds')).not.toBeVisible();
  await expect(page.getByText('Spring Dance')).not.toBeVisible();
  await expect(page.getByText('Rainy Mood')).not.toBeVisible();
});

test('should add one track to playlist by plus button', async ({ page }) => {
  await page.goto('https://vite-react-alpha-lemon.vercel.app/');
  await page.waitForLoadState('networkidle');

  const addButtons = page.getByRole('button', { name: '+' });

  await addButtons.nth(0).click();

  await expect(page.getByText('No tracks on playlist')).not.toBeVisible();
  await expect(page.getByText('215')).toBeVisible();
});

test('should calculate total playlist duration in seconds', async ({ page }) => {
  await page.goto('https://vite-react-alpha-lemon.vercel.app/');
  await page.waitForLoadState('networkidle');

  const addButtons = page.getByRole('button', { name: '+' });

  await addButtons.nth(0).click(); // Summer Breeze = 03:35 = 215
  await addButtons.nth(1).click(); // Autumn Leaves = 03:00 = 180

  await expect(page.getByText('395')).toBeVisible();
});
