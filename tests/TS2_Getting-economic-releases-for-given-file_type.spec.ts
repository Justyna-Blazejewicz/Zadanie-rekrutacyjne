import { test, expect } from '@playwright/test';

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla typu danych JSON
test('File_type is JSON', async ({ request }) => {
    const response = await request.get(`https://api.stlouisfed.org/fred/releases?api_key=ab71bd75ae93bcab2ab2d5940b2ac8fd&file_type=json`)
    expect(response.status()).toBe(200)

    const contentType = response.headers()['content-type'];
    expect(contentType).toBeDefined();
    expect(contentType).toMatch('application/json');

    const responseBody = await response.text();
    expect(responseBody).toEqual(expect.anything());
    expect(Object.keys(responseBody).length).toBeGreaterThan(0);
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla typu danych XML
test('File_type is XML', async ({ request }) => {
    const response = await request.get(`https://api.stlouisfed.org/fred/releases?api_key=ab71bd75ae93bcab2ab2d5940b2ac8fd&file_type=xml`)
    expect(response.status()).toBe(200)

    const contentType = response.headers()['content-type'];
    expect(contentType).toBeDefined();
    expect(contentType).toMatch('text/xml');

    const responseBody = await response.text();
    expect(responseBody).toEqual(expect.anything());
    expect(Object.keys(responseBody).length).toBeGreaterThan(0);
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla dowolnego typu danych (innego niż JSON/XML)
test('File_type is random (except JSON/XML)', async ({ request }) => {
    const response = await request.get(`https://api.stlouisfed.org/fred/releases?api_key=ab71bd75ae93bcab2ab2d5940b2ac8fd&file_type=abcd`)
    expect(response.status()).toBeGreaterThanOrEqual(400)
    expect(response.status()).toBeLessThan(500)

    const responseBody = await response.text();
    expect(responseBody).toContain('error code');
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla pustego typu danych
test('File_type is empty', async ({ request }) => {
    const response = await request.get(`https://api.stlouisfed.org/fred/releases?api_key=ab71bd75ae93bcab2ab2d5940b2ac8fd&file_type=`)
    expect(response.status()).toBe(200)

    const responseBody = await response.text();
    expect(responseBody).toEqual(expect.anything());
    expect(Object.keys(responseBody).length).toBeGreaterThan(0);
})
