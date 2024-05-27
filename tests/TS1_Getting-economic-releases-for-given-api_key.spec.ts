import { test, expect } from '@playwright/test';

const HTTP200 = 200;
const HTTP400 = 400;
const HTTP500 = 500;
const error_message = 'error';
const correct_api_key = 'ab71bd75ae93bcab2ab2d5940b2ac8fd';
const incorrect_api_key = 'ab71bd75ae93bcab2ab2d5940b2ac8fk';


// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla prawidłowego klucza interfejsu
test('Api_key correct', async ({ request }) => {
    const response = await request.get(`?api_key=${correct_api_key}`)
    expect(response.status()).toBe(HTTP200)

    const responseBody = await response.text();
    expect(responseBody).toEqual(expect.anything());
    expect(Object.keys(responseBody).length).toBeGreaterThan(0);
})

    // Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla nieprawidłowego klucza interfejsu
    test('Api_key incorrect', async ({ request }) => {
        const response = await request.get(`?api_key=${incorrect_api_key}`)
        expect(response.status()).toBeGreaterThanOrEqual(HTTP400)
        expect(response.status()).toBeLessThan(HTTP500)

        const responseBody = await response.text();
        expect(responseBody).toContain(error_message);
    })

    // Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla pustego klucza interfejsu
    test('Api_key empty', async ({ request }) => {
        const response = await request.get(`?api_key=`)
        expect(response.status()).toBeGreaterThanOrEqual(HTTP400)
        expect(response.status()).toBeLessThan(HTTP500)

        const responseBody = await response.text();
        expect(responseBody).toContain(error_message);
    })

    // Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane gdy klucz interfejsu nie jest podany
    test('No api_key', async ({ request }) => {
        const response = await request.get(``)
        expect(response.status()).toBeGreaterThanOrEqual(HTTP400)
        expect(response.status()).toBeLessThan(HTTP500)

        const responseBody = await response.text();
        expect(responseBody).toContain(error_message);
    })

    // Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane gdy typ metody HTTP jest inny niż GET
    test('Incorrect HTTP method type', async ({ request }) => {
        const response = await request.post(`?api_key=${correct_api_key}`)
        expect(response.status()).toBeGreaterThanOrEqual(HTTP400)
        expect(response.status()).toBeLessThan(HTTP500)

        const responseBody = await response.text();
        expect(responseBody).toContain(error_message);
    })

