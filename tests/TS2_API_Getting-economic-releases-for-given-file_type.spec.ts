import { test, expect } from '@playwright/test';
import { Constants } from './Constants';

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla typu danych JSON
test('File_type is JSON', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json`)
    expect(response.status()).toBe(Constants.HTTP200)

    const contentType = response.headers()['content-type'];
    expect(contentType).toBeDefined();
    expect(contentType).toMatch('application/json');

    const responseBody = await response.text();
    expect(responseBody).toEqual(expect.anything());
    expect(Object.keys(responseBody).length).toBeGreaterThan(0);
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla typu danych XML
test('File_type is XML', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=xml`)
    expect(response.status()).toBe(Constants.HTTP200)

    const contentType = response.headers()['content-type'];
    expect(contentType).toBeDefined();
    expect(contentType).toMatch('text/xml');

    const responseBody = await response.text();
    expect(responseBody).toEqual(expect.anything());
    expect(Object.keys(responseBody).length).toBeGreaterThan(0);
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla dowolnego typu danych (innego niż JSON/XML)
test('File_type is random (except JSON/XML)', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=abcd`)
    expect(response.status()).toBeGreaterThanOrEqual(Constants.HTTP400)
    expect(response.status()).toBeLessThan(Constants.HTTP500)

    const responseBody = await response.text();
    expect(responseBody).toContain(Constants.error_message);
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla pustego typu danych
test('File_type is empty', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=`)
    expect(response.status()).toBe(Constants.HTTP200)

    const responseBody = await response.text();
    expect(responseBody).toEqual(expect.anything());
    expect(Object.keys(responseBody).length).toBeGreaterThan(0);
})
