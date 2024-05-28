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

const links1 = [
  { name: 'research.stlouisfed.org', url: 'https://research.stlouisfed.org/' },
  { name: 'Research News ', url: 'https://research.stlouisfed.org/publications/research-news/' },
  { name: 'Economists', url: 'https://research.stlouisfed.org/econ/' },
  { name: 'Publications', url: 'https://research.stlouisfed.org/publications/' },
  { name: 'Working Papers', url: 'https://research.stlouisfed.org/wp/' },
  { name: 'Information Services', url: 'https://research.stlouisfed.org/info-services.html' }
]

const links2 = [
  { name: 'AL FRED', url: 'https://alfred.stlouisfed.org/' },
  { name: 'FRASER', url: 'https://fraser.stlouisfed.org/' },
  { name: 'ECON LOWDOWN', url: 'https://www.econlowdown.org/' }
]

// Sprawdzenie poprawności działania logo "Federal Reserve Bank of St.Louis"
test('Checking Federal Reserve Bank of St.Louis logo', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Federal Reserve bank of St.' }).click()
  ]);
  await newPage.waitForLoadState();
  expect(newPage.url()).toContain('https://www.stlouisfed.org');
});

// Sprawdzenie poprawności działania logo "FRED Economic Data" -> przejście na stronę główną
test('Checking FRED Economic Data, St.Louis FED logo', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.getByRole('link', { name: 'FRED Economic Data' }).click();

  expect(page.url()).toBe('https://fred.stlouisfed.org/');
});

// Sprawdzenie poprawności działania paska nawigacyjnego górnego

// Sprawdzenie poprawności działania stron z listy rozwijanej Economic Research Resources
for (const links of links1) {
  test(`Redirecting to ${links.name} page`, async ({ page }) => {
    await page.goto(`${Constants.UI_Url}`);
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      page.locator('#research-resources-link').click(),
      page.getByRole('link', { name: `${links.name}` }).click()
    ]);
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(`${links.url}`);
  });
}

// Sprawdzenie poprawności działania stron z listy rozwijanej Switch Products

//Sprawdzenie poprawności działania przekierowania na stronę FRED
test('Redirecting to FRED page', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.locator('#switchProd').click();
  await page.getByRole('menuitem', { name: 'FRED', exact: true }).click();

  expect(page.url()).toBe('https://fred.stlouisfed.org/');
});

//Sprawdzenie poprawności działania przekierowania na stronę ALFRED, FRASER, ECON LOWDOWN
for (const links of links2) {
  test(`Redirecting to ${links.name} page`, async ({ page }) => {
    await page.goto(`${Constants.UI_Url}`);
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      page.locator('#switchProd').click(),
      page.getByRole('menuitem', { name: `${links.name}`, exact: true }).click()
    ]);
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(`${links.url}`);
  });
}

// Sprawdzenie obecności okienka logowania
test('Checking logging in', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.locator('#my-account-link').getByText('My Account').click();

  const loginWindowSelector = '#sign-in-modal';
  await page.waitForSelector(loginWindowSelector, { state: 'visible' });

  const loginWindow = await page.locator(loginWindowSelector);
  await expect(loginWindow).toBeVisible();
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

  const searchWindowSelector = '#my-account-menu';
  await page.waitForSelector(searchWindowSelector, { state: 'visible' });

  const searchWindow = await page.locator(searchWindowSelector);
  await expect(searchWindow).toBeVisible();
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
  expect(page.url()).toBe('https://fredaccount.stlouisfed.org/');

  await page.locator('#my-account-link').click();
  await page.getByRole('link', { name: ' Dashboards' }).click();
  expect(page.url()).toBe('https://fredaccount.stlouisfed.org/dashboard');

  await page.locator('#my-account-link').click();
  await page.getByRole('link', { name: ' Graphs' }).click();
  expect(page.url()).toBe('https://fredaccount.stlouisfed.org/fredgraph');

  await page.locator('#my-account-link').click();
  await page.getByRole('link', { name: ' Data Lists' }).click();
  expect(page.url()).toBe('https://fredaccount.stlouisfed.org/datalists');

  await page.locator('#my-account-link').click();
  await page.getByRole('link', { name: ' Maps' }).click();
  expect(page.url()).toBe('https://fredaccount.stlouisfed.org/geofred');

  await page.locator('#my-account-link').click();
  await page.getByRole('link', { name: ' Notifications' }).click();
  expect(page.url()).toBe('https://fredaccount.stlouisfed.org/viewemailnotifications');

  await page.locator('#my-account-link').click();
  await page.getByRole('link', { name: ' API Keys' }).click();
  expect(page.url()).toBe('https://fredaccount.stlouisfed.org/apikeys');

  await page.locator('#my-account-link').click();
  await page.getByRole('link', { name: ' Settings' }).click();
  expect(page.url()).toBe('https://fredaccount.stlouisfed.org/editinfo');

  await page.locator('#my-account-link').click();
  await page.locator('#my-account-menu').getByText('Sign out').click();
  const loginWindowSelector = '#sign-in-modal';
  await page.waitForSelector(loginWindowSelector, { state: 'visible' });
  const loginWindow = await page.locator(loginWindowSelector);
  await expect(loginWindow).toBeVisible();
});

// Sprawdzenie poprawności działania paska nawigacyjnego dolnego

// Sprawdzenie poprawności działania wyszukiwarki
test('Checking search bar', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.getByPlaceholder('Search FRED ...').click();
  await page.getByPlaceholder('Search FRED ...').press('CapsLock');
  await page.getByPlaceholder('Search FRED ...').fill('Economic');
  await page.getByPlaceholder('Search FRED ...').press('Enter');
  expect(page.url()).toBe('https://fred.stlouisfed.org/searchresults/?st=Economic');
});

//Sprawdzenie poprawności działania elementów paska nawigacyjnego dolnego
test('Checking lower nav bar', async ({ page }) => {
  await page.goto(`${Constants.UI_Url}`);
  await page.getByRole('link', { name: 'Release Calendar' }).click();
  expect(page.url()).toBe('https://fred.stlouisfed.org/releases/calendar');

  await page.goto(`${Constants.UI_Url}`);
  await page.getByLabel('FRED Tools').click();
  await page.getByRole('link', { name: 'FRED Add-in for Excel' }).click();
  expect(page.url()).toBe('https://fred.stlouisfed.org/fred-addin/');

  await page.getByLabel('FRED Tools').click();
  await page.getByRole('link', { name: 'FRED API' }).click();
  expect(page.url()).toBe('https://fred.stlouisfed.org/docs/api/fred/');

  await page.getByLabel('FRED Tools').click();
  await page.getByRole('link', { name: 'FRED Mobile Apps' }).click();
  expect(page.url()).toBe('https://fred.stlouisfed.org/fred-mobile/index.php');

  await page.getByRole('link', { name: 'FRED News' }).click();
  expect(page.url()).toBe('https://news.research.stlouisfed.org/category/fred-announcements/');

  await page.goto(`${Constants.UI_Url}`);
  await page.getByRole('link', { name: 'FRED Blog' }).click();
  expect(page.url()).toBe('https://fredblog.stlouisfed.org/');

  await page.getByLabel('About FRED').click();
  await page.getByRole('link', { name: 'What is FRED' }).click();
  expect(page.url()).toBe('https://fredhelp.stlouisfed.org/fred/about/about-fred/what-is-fred/');

  await page.getByLabel('About FRED').click();
  await page.getByRole('link', { name: 'Tutorials' }).click();
  expect(page.url()).toBe('https://fredhelp.stlouisfed.org/');

  await page.getByLabel('About FRED').click();
  await page.getByRole('link', { name: 'Data Literacy' }).click();
  expect(page.url()).toBe('https://www.stlouisfed.org/education/digital-badges/fred-data-practitioner');

  await page.goto(`${Constants.UI_Url}`);
  await page.getByLabel('About FRED').click();
  await page.getByRole('link', { name: 'Contact Us' }).click();
  expect(page.url()).toBe('https://fred.stlouisfed.org/contactus/');
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