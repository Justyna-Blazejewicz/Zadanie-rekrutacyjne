import { test, expect } from '@playwright/test';
import { Constants } from './Constants';

const bigResolutions = [
  { width: 1920, height: 1080 }, // Full HD
  { width: 1366, height: 768 },  // HD
  { width: 1536, height: 864 },  // HD+
  { width: 1280, height: 720 },  // HD 720p
];

const smallResolutions = [
  { width: 375, height: 812 },   // iPhone X
  { width: 414, height: 896 },   // iPhone XR
  { width: 768, height: 1024 },  // iPad
  { width: 320, height: 480 }    // Mobile small
]

// Sprawdzenie poprawności działania logo "Federal Reserve Bank of St.Louis"
test('Checking Federal Reserve Bank of St.Louis logo', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Federal Reserve bank of St.' }).click();
  const page1 = await page1Promise;
});

// Sprawdzenie poprawności działania logo "FRED Economic Data" -> przejście na stronę główną
test('Checking FRED Economic Data, St.Louis FED logo', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.getByRole('link', { name: 'FRED Economic Data' }).click();
});

// Sprawdzenie poprawności działania paska nawigacyjnego górnego

  // Sprawdzenie poprawności działania listy rozwijanej Economic Research Resources

    //Sprawdzenie poprawności działania przekierowania na stronę research.stlouisfed.org 
test('Redirecting to research.stlouisfed.org page', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.locator('#research-resources-link').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'research.stlouisfed.org' }).click();
  const page1 = await page1Promise;
});

    //Sprawdzenie poprawności działania przekierowania na stronę Research News
test('Redirecting to Research News page', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.locator('#research-resources-link').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Research News' }).click();
  const page1 = await page1Promise;
});

    //Sprawdzenie poprawności działania przekierowania na stronę Economnists
test('Redirecting to Economists page', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.locator('#research-resources-link').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Economists' }).click();
  const page1 = await page1Promise;
});

    //Sprawdzenie poprawności działania przekierowania na stronę Publications
test('Redirecting to Publications page', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.locator('#research-resources-link').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Publications' }).click();
  const page1 = await page1Promise;
});

    //Sprawdzenie poprawności działania przekierowania na stronę Working Papers
test('Redirecting to Working Papers page', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.locator('#research-resources-link').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Working Papers' }).click();
  const page1 = await page1Promise;
});

    //Sprawdzenie poprawności działania przekierowania na stronę Information Services
test('Redirecting to Information Services page', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.locator('#research-resources-link').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Information Services' }).click();
  const page1 = await page1Promise;
});

  // Sprawdzenie poprawności działania listy rozwijanej Switch Products

    //Sprawdzenie poprawności działania przekierowania na stronę FRED
test('Redirecting to FRED page', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.locator('#switchProd').click();
  await page.getByRole('menuitem', { name: 'FRED', exact: true }).click();
});

    //Sprawdzenie poprawności działania przekierowania na stronę ALFRED
test('Redirecting to ALFRED page', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.locator('#switchProd').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('menuitem', { name: 'AL FRED', exact: true }).click();
  const page1 = await page1Promise;
});

    //Sprawdzenie poprawności działania przekierowania na stronę FRASER
test('Redirecting to FRASER page', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.locator('#switchProd').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('menuitem', { name: 'FRASER', exact: true }).click();
  const page1 = await page1Promise;
});

    //Sprawdzenie poprawności działania przekierowania na stronę ECON LOWDOWN
test('Redirecting to ECON LOWDOWN page', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.locator('#switchProd').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('menuitem', { name: 'ECON LOWDOWN', exact: true }).click();
  const page1 = await page1Promise;
});

  // Sprawdzenie poprawności działania logowania

  test('Checking logging in', async ({ page }) => {
    await page.goto(`${Constants.UI_Url}`);
    await page.locator('#my-account-link').getByText('My Account').click();
    await page.getByPlaceholder('Email Address *').click();
    await page.getByPlaceholder('Email Address *').fill('justyna.bl.testing@gmail.com');
    await page.getByPlaceholder('Password *').click();
    await page.getByPlaceholder('Password *').press('CapsLock');
    await page.getByPlaceholder('Password *').fill('Test1234');
    await page.getByRole('button', { name: 'Sign In' }).click();
  });

  //Sprawdzenie poprawności działania wyszukiwarki po zalogowaniu
test('Checking search bar in My Account', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.locator('#my-account-link').getByText('My Account').click();
  await page.getByPlaceholder('Email Address *').click();
  await page.getByPlaceholder('Email Address *').fill('justyna.bl.testing@gmail.com');
  await page.getByPlaceholder('Password *').click();
  await page.getByPlaceholder('Password *').press('CapsLock');
  await page.getByPlaceholder('Password *').fill('Test1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('#my-account-link').getByText('My Account').click();
  await page.getByPlaceholder('Search My Content').click();
  await page.getByPlaceholder('Search My Content').press('CapsLock');
  await page.getByPlaceholder('Search My Content').fill('Economic');
  await page.getByPlaceholder('Search My Content').press('Enter');
})

    //Sprawdzenie poprawności działania przekierowania na strony z zakładki My Account
test('Redirecting to My Account pages', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.locator('#my-account-link').getByText('My Account').click();
  await page.getByPlaceholder('Email Address *').click();
  await page.getByPlaceholder('Email Address *').fill('justyna.bl.testing@gmail.com');
  await page.getByPlaceholder('Password *').click();
  await page.getByPlaceholder('Password *').press('CapsLock');
  await page.getByPlaceholder('Password *').fill('Test1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('#my-account-link').click();
  await page.getByRole('link', { name: ' My Content' }).click();
  await page.locator('#my-account-link').click();
  await page.getByRole('link', { name: ' Dashboards' }).click();
  await page.locator('#my-account-link').click();
  await page.getByRole('link', { name: ' Graphs' }).click();
  await page.locator('#my-account-link').click();
  await page.getByRole('link', { name: ' Data Lists' }).click();
  await page.locator('#my-account-link').click();
  await page.getByRole('link', { name: ' Maps' }).click();
  await page.locator('#my-account-link').click();
  await page.getByRole('link', { name: ' Notifications' }).click();
  await page.locator('#my-account-link').click();
  await page.getByRole('link', { name: ' API Keys' }).click();
  await page.locator('#my-account-link').click();
  await page.getByRole('link', { name: ' Settings' }).click();
  await page.locator('#my-account-link').click();
  await page.locator('#my-account-menu').getByText('Sign out').click();
});

// Sprawdzenie poprawności działania paska nawigacyjnego dolnego

  // Sprawdzenie poprawności działania wyszukiwarki

test('Checking search bar', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.getByPlaceholder('Search FRED ...').click();
  await page.getByPlaceholder('Search FRED ...').press('CapsLock');
  await page.getByPlaceholder('Search FRED ...').fill('Economic');
  await page.goto('https://fred.stlouisfed.org/searchresults/?st=Economic');
});

  //Sprawdzenie poprawności działania elementów paska nawigacyjnego dolnego

  test('Checking lower nav bar', async ({ page }) => {
    await page.goto(`${Constants.UI_Url}`);
    await page.getByRole('link', { name: 'Release Calendar' }).click();
    await page.goto(`${Constants.UI_Url}`);
    await page.getByLabel('FRED Tools').click();
    await page.getByRole('link', { name: 'FRED Add-in for Excel' }).click();
    await page.getByLabel('FRED Tools').click();
    await page.getByRole('link', { name: 'FRED API' }).click();
    await page.getByLabel('FRED Tools').click();
    await page.getByRole('link', { name: 'FRED Mobile Apps' }).click();
    await page.getByRole('link', { name: 'FRED News' }).click();
    await page.goto(`${Constants.UI_Url}`);
    await page.getByRole('link', { name: 'FRED Blog' }).click();
    await page.getByLabel('About FRED').click();
    await page.getByRole('link', { name: 'What is FRED' }).click();
    await page.getByLabel('About FRED').click();
    await page.getByRole('link', { name: 'Tutorials' }).click();
    await page.getByLabel('About FRED').click();
    await page.getByRole('link', { name: 'Data Literacy' }).click();
    await page.goto(`${Constants.UI_Url}`);
    await page.getByLabel('About FRED').click();
    await page.getByRole('link', { name: 'Contact Us' }).click();
  });


  // Sprawdzenie responsywności nagłówków dla dużych i małych rozdzielczości

    for (const resolution of bigResolutions) {
      test(`Should display correctly at big resolutions: ${resolution.width}x${resolution.height}`, async ({ page }) => {
        await page.setViewportSize(resolution);
        await page.goto(`${Constants.UI_Url}`);
  
        const upperNavBar = page.getByRole('link', { name: 'Federal Reserve bank of St.' });
        await expect(upperNavBar).toBeVisible();

        const lowerNavBar = page.getByRole('link', { name: 'FRED Economic Data' });
        await expect(lowerNavBar).toBeVisible();
      });
    }

    for (const resolution of smallResolutions) {
      test(`Should display correctly at small resolutions: ${resolution.width}x${resolution.height}`, async ({ page }) => {
        await page.setViewportSize(resolution);
        await page.goto(`${Constants.UI_Url}`);
  
        const upperNavBar = page.getByRole('link', { name: 'Federal Reserve Economic Data' });
        await expect(upperNavBar).not.toBeVisible();

        const lowerNavBar = page.getByRole('link', { name: 'mini fred logo' });
        await expect(lowerNavBar).toBeVisible();
      });
    }