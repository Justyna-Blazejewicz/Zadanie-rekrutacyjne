import { test, expect } from '@playwright/test';
import { Constants } from './Constants';

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla prawidłowego klucza interfejsu
test('Api_key correct', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}`)
    expect(response.status()).toBe(Constants.HTTP200)

    const responseBody = await response.text();
    expect(responseBody).toEqual(expect.anything());
    expect(Object.keys(responseBody).length).toBeGreaterThan(0);
})

    // Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla nieprawidłowego klucza interfejsu
    test('Api_key incorrect', async ({ request }) => {
        const response = await request.get(`?api_key=${Constants.incorrect_api_key}`)
        expect(response.status()).toBeGreaterThanOrEqual(Constants.HTTP400)
        expect(response.status()).toBeLessThan(Constants.HTTP500)

        const responseBody = await response.text();
        expect(responseBody).toContain(Constants.error_message);
    })

    // Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla pustego klucza interfejsu
    test('Api_key empty', async ({ request }) => {
        const response = await request.get(`?api_key=`)
        expect(response.status()).toBeGreaterThanOrEqual(Constants.HTTP400)
        expect(response.status()).toBeLessThan(Constants.HTTP500)

        const responseBody = await response.text();
        expect(responseBody).toContain(Constants.error_message);
    })

    // Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane gdy klucz interfejsu nie jest podany
    test('No api_key', async ({ request }) => {
        const response = await request.get(``)
        expect(response.status()).toBeGreaterThanOrEqual(Constants.HTTP400)
        expect(response.status()).toBeLessThan(Constants.HTTP500)

        const responseBody = await response.text();
        expect(responseBody).toContain(Constants.error_message);
    })

    // Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane gdy typ metody HTTP jest inny niż GET
    test('Incorrect HTTP method type', async ({ request }) => {
        const response = await request.post(`?api_key=${Constants.correct_api_key}`)
        expect(response.status()).toBeGreaterThanOrEqual(Constants.HTTP400)
        expect(response.status()).toBeLessThan(Constants.HTTP500)

        const responseBody = await response.text();
        expect(responseBody).toContain(Constants.error_message);
    })

