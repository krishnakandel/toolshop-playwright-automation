
import { test, expect } from '@playwright/test';
test.describe('Toolshop home page tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Practice Software Testing/);
  });

  test('URL should be Toolshop homepage', async ({ page }) => {
    await expect(page).toHaveURL(/practicesoftwaretesting/);
  });

  test('search field is visible', async ({ page }) => {
    const searchBox = page.getByPlaceholder(/search/i);
    await expect(searchBox).toBeVisible();
  });

  test('user can search for a product', async ({ page }) => {
    const searchBox = page.getByPlaceholder(/search/i);

    await searchBox.fill('pliers');
    await searchBox.press('Enter');

    await expect(page.getByText(/pliers/i).first()).toBeVisible();
  });

  test('search field accepts entered text', async ({ page }) => {
    const searchBox = page.getByPlaceholder(/search/i);

    await searchBox.fill('hammer');

    await expect(searchBox).toHaveValue('hammer');
  });

  test('user can open a product from search results', async ({ page }) => {

    const searchBox = page.getByPlaceholder(/search/i);

    await searchBox.fill('pliers');
    await searchBox.press('Enter');

    const product = page
      .getByRole('link')
      .filter({ hasText: /pliers/i })
      .first();

    await expect(product).toBeVisible();

    await product.click();

    await expect(page).toHaveURL(/\/product\//);
  });


  test('product cards display prices', async ({ page }) => {
    const price = page.getByText(/\$\d+/).first();

    await expect(price).toBeVisible();
  });

  // Homepage should display products
  test('homepage displays products', async ({ page }) => {

    const products = page.locator('[data-test="product-name"]');

    await expect(products.first()).toBeVisible();

    const productCount = await products.count();

    expect(productCount).toBeGreaterThan(0);

  });


  // Product should display a name
  test('product cards display product names', async ({ page }) => {

    const productNames = page.locator('[data-test="product-name"]');

    await expect(productNames.first()).toBeVisible();

    await expect(productNames.first()).not.toHaveText('');

  });


  // Product should display a price
  test('product cards display product prices', async ({ page }) => {

    const prices = page.locator('[data-test="product-price"]');

    await expect(prices.first()).toBeVisible();

    const priceText = await prices.first().textContent();

    expect(priceText).toMatch(/\$\d+/);

  });

  // Search should support partial product names
  test('user can search using partial product name', async ({ page }) => {

    const searchBox = page.getByPlaceholder(/search/i);

    await searchBox.fill('plier');

    await searchBox.press('Enter');

    const product = page
      .getByRole('link')
      .filter({ hasText: /plier/i })
      .first();

    await expect(product).toBeVisible();

  });


  // Search should be case insensitive
  test('search is case insensitive', async ({ page }) => {

    const searchBox = page.getByPlaceholder(/search/i);

    await searchBox.fill('PLIERS');

    await searchBox.press('Enter');

    const product = page
      .getByRole('link')
      .filter({ hasText: /pliers/i })
      .first();

    await expect(product).toBeVisible();

  });


  // Search for nonexistent product should return no products
  test('search for nonexistent product returns no products', async ({ page }) => {

    const searchBox = page.getByPlaceholder(/search/i);

    await searchBox.fill('xyznonexistentproduct12345');

    await searchBox.press('Enter');

    const products = page.locator('[data-test="product-name"]');

    await expect(products).toHaveCount(0);

  });


  // User should be able to clear the search field
  test('user can clear search field', async ({ page }) => {

    const searchBox = page.getByPlaceholder(/search/i);

    await searchBox.fill('hammer');

    await expect(searchBox).toHaveValue('hammer');

    await searchBox.clear();

    await expect(searchBox).toHaveValue('');

  });


  // Sort dropdown should be visible
  test('sort dropdown is visible', async ({ page }) => {

    const sortDropdown = page.getByRole('combobox').first();

    await expect(sortDropdown).toBeVisible();

  });


  // Sort dropdown should contain sorting options
 test('sort dropdown contains options', async ({ page }) => {

  const sortDropdown = page.locator('[data-test="sort"]');

  await expect(sortDropdown).toBeVisible();

  const options = sortDropdown.locator('option');

  expect(await options.count()).toBeGreaterThan(1);

});

  // Products can be sorted by price low to high
  test('products can be sorted by price low to high', async ({ page }) => {

  const sortDropdown = page.locator('[data-test="sort"]');

  await expect(sortDropdown).toBeVisible();

  // Select using the actual HTML value
  await sortDropdown.selectOption('price,asc');

  // Confirm Playwright really selected it
  await expect(sortDropdown).toHaveValue('price,asc');

  // Wait until Toolshop says sorting has completed
  await expect(
    page.locator('[data-test="sorting_completed"]')
  ).toBeVisible();

  const priceElements = page.locator('[data-test="product-price"]');

  const priceTexts = await priceElements.allTextContents();

  const actualPrices = priceTexts.map(text =>
    Number(text.replace('$', '').trim())
  );

  console.log('Actual prices:', actualPrices);

  const sortedPrices = [...actualPrices].sort((a, b) => a - b);

  console.log('Expected sorted prices:', sortedPrices);

  expect(actualPrices).toEqual(sortedPrices);
});


  // Category filter section should be visible
  test('category filter is visible', async ({ page }) => {

    await expect(
      page.getByText(/by category/i)
    ).toBeVisible();

  });


  // Brand filter section should be visible
  test('brand filter is visible', async ({ page }) => {

    await expect(
      page.getByText(/by brand/i)
    ).toBeVisible();

  });


  // Eco-friendly filter should be available
  test('eco-friendly filter is available', async ({ page }) => {

    const ecoFilter = page.getByLabel(/show only eco-friendly products/i);

    await expect(ecoFilter).toBeVisible();

    await expect(ecoFilter).not.toBeChecked();

  });


  //  User can select eco-friendly filter
  test('user can select eco-friendly filter', async ({ page }) => {

    const ecoFilter = page.getByLabel(/show only eco-friendly products/i);

    await ecoFilter.check();

    await expect(ecoFilter).toBeChecked();

  });


  // Search field can be cleared after performing a search
  test('user can reset a search', async ({ page }) => {

    const searchBox = page.getByPlaceholder(/search/i);

    await searchBox.fill('pliers');

    await searchBox.press('Enter');

    await expect(
      page.getByText(/pliers/i).first()
    ).toBeVisible();

    await searchBox.clear();

    await expect(searchBox).toHaveValue('');

  });


  // First product can be opened from homepage
  test('first product on homepage can be opened', async ({ page }) => {

    const firstProduct = page
      .locator('[data-test="product-name"]')
      .first();

    await expect(firstProduct).toBeVisible();

    await firstProduct.click();

    await expect(page).toHaveURL(/\/product\//);

  });


  // Product price should contain a valid positive numeric value
  test('product price is a valid positive number', async ({ page }) => {

    const price = page
      .locator('[data-test="product-price"]')
      .first();

    await expect(price).toBeVisible();

    const priceText = await price.textContent();

    expect(priceText).not.toBeNull();

    const numericPrice = Number(
      priceText!.replace('$', '').trim()
    );

    expect(numericPrice).toBeGreaterThan(0);

  });


});