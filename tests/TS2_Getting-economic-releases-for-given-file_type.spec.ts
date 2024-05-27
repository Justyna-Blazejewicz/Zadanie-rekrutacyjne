import { test, expect } from '@playwright/test';

const HTTP200 = 200;
const HTTP400 = 400;
const HTTP500 = 500;
const error_message = 'error';
const correct_api_key = 'ab71bd75ae93bcab2ab2d5940b2ac8fd';

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla typu danych JSON
test('File_type is JSON', async ({ request }) => {
    const response = await request.get(`?api_key=${correct_api_key}&file_type=json`)
    expect(response.status()).toBe(HTTP200)

    const contentType = response.headers()['content-type'];
    expect(contentType).toBeDefined();
    expect(contentType).toMatch('application/json');

    const responseBody = await response.text();
    expect(responseBody).toEqual(expect.anything());
    expect(Object.keys(responseBody).length).toBeGreaterThan(0);
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla typu danych XML
test('File_type is XML', async ({ request }) => {
    const response = await request.get(`?api_key=${correct_api_key}&file_type=xml`)
    expect(response.status()).toBe(HTTP200)

    const contentType = response.headers()['content-type'];
    expect(contentType).toBeDefined();
    expect(contentType).toMatch('text/xml');

    const responseBody = await response.text();
    expect(responseBody).toEqual(expect.anything());
    expect(Object.keys(responseBody).length).toBeGreaterThan(0);
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla dowolnego typu danych (innego niż JSON/XML)
test('File_type is random (except JSON/XML)', async ({ request }) => {
    const response = await request.get(`?api_key=${correct_api_key}&file_type=abcd`)
    expect(response.status()).toBeGreaterThanOrEqual(HTTP400)
    expect(response.status()).toBeLessThan(HTTP500)

    const responseBody = await response.text();
    expect(responseBody).toContain(error_message);
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla pustego typu danych
test('File_type is empty', async ({ request }) => {
    const response = await request.get(`?api_key=${correct_api_key}&file_type=`)
    expect(response.status()).toBe(HTTP200)

    const responseBody = await response.text();
    expect(responseBody).toEqual(expect.anything());
    expect(Object.keys(responseBody).length).toBeGreaterThan(0);
})
