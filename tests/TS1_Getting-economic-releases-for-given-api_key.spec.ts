import { test, expect } from '@playwright/test';

// test('API GET Request', async ({ request }) => {
//     const response = await request.get(`https://api.stlouisfed.org/fred/releases?api_key=ab71bd75ae93bcab2ab2d5940b2ac8fd&file_type=json`)
//     expect(response.status()).toBe(200)

//     const issues = await request.get(`https://api.stlouisfed.org/fred/releases?api_key=ab71bd75ae93bcab2ab2d5940b2ac8fd&file_type=json`);
//     expect(issues.ok()).toBeTruthy();
//     expect(await issues.json()).toEqual(expect.objectContaining({
//         count: 314
//     }));
// })

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla prawidłowego klucza interfejsu
test('Api_key correct', async ({ request }) => {
    const response = await request.get(`https://api.stlouisfed.org/fred/releases?api_key=ab71bd75ae93bcab2ab2d5940b2ac8fd`)
    expect(response.status()).toBe(200)

    const issues = await response.text();
    expect(issues).toContain('releases');
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla nieprawidłowego klucza interfejsu
test('Api_key incorrect', async ({ request }) => {
    const response = await request.get(`https://api.stlouisfed.org/fred/releases?api_key=ab71bd75ae93bcab2ab2d5940b2ac8fk`)
    expect(response.status()).toBeGreaterThanOrEqual(400)
    expect(response.status()).toBeLessThan(500)

    const issues = await response.text();
    expect(issues).toContain('error code');
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla pustego klucza interfejsu
test('Api_key empty', async ({ request }) => {
    const response = await request.get(`https://api.stlouisfed.org/fred/releases?api_key=`)
    expect(response.status()).toBeGreaterThanOrEqual(400)
    expect(response.status()).toBeLessThan(500)

    const issues = await response.text();
    expect(issues).toContain('error code');
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane gdy klucz interfejsu nie jest podany
test('No api_key', async ({ request }) => {
    const response = await request.get(`https://api.stlouisfed.org/fred/releases`)
    expect(response.status()).toBeGreaterThanOrEqual(400)
    expect(response.status()).toBeLessThan(500)

    const issues = await response.text();
    expect(issues).toContain('error code');
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane gdy typ metody HTTP jest inny niż GET
test('Incorrect HTTP method type', async ({ request }) => {
    const response = await request.post(`https://api.stlouisfed.org/fred/releases`)
    expect(response.status()).toBeGreaterThanOrEqual(400)
    expect(response.status()).toBeLessThan(500)

    const issues = await response.text();
    expect(issues).toContain('error code');
})

