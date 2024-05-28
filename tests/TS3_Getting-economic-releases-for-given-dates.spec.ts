import { test, expect } from '@playwright/test';
import { Constants } from './Constants';

let date1 = '2024-05-01';
let date2 = '2024-04-30';
let date3 = '2024-04-01';
let date4 = '2024-05-10';
let date5 = '01-04-2024';

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla danej daty od
test('Realtime_start date is given', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&realtime_start=${date1}`)
    expect(response.status()).toBe(Constants.HTTP200)

    const responseBody = await response.json();

    for(const release of responseBody.releases){
        const realtimeStartDate = new Date(release.realtime_start)
        const expectedDate = new Date(date1);
        expect(realtimeStartDate >= expectedDate).toBeTruthy()
    }
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla danej daty do
test('Realtime_end date is given', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&realtime_end=${date2}`)
    expect(response.status()).toBe(Constants.HTTP200)

    const responseBody = await response.json();

    for(const release of responseBody.releases){
        const realtimeEndDate = new Date(release.realtime_end)
        const expectedDate = new Date(date2);
        expect(realtimeEndDate <= expectedDate).toBeTruthy()
    }
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla prawidłowych danych od i do
test('Realtime_start and realtime_end dates are given and correct', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&realtime_start=${date3}&realtime_end=${date4}`)
    expect(response.status()).toBe(Constants.HTTP200)

    const responseBody = await response.json();

    for(const release of responseBody.releases){
        const realtimeStartDate = new Date(release.realtime_start)
        const expectedFromDate = new Date(date3);
        expect(realtimeStartDate >= expectedFromDate).toBeTruthy()
        const realtimeEndDate = new Date(release.realtime_end)
        const expectedToDate = new Date(date4);
        expect(realtimeEndDate <= expectedToDate).toBeTruthy()
    }
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla nieprawidłowych dat od i do (data od jest wcześniejsza od daty do)
test('Realtime_start and realtime_end dates are given and incorrect', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&realtime_start=${date4}&realtime_end=${date3}`)
    expect(response.status()).toBeGreaterThanOrEqual(Constants.HTTP400)
    expect(response.status()).toBeLessThan(Constants.HTTP500)

    const responseBody = await response.text();
    expect(responseBody).toContain(Constants.error_message);
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla nieprawidłowego formatu dat (nieprawidłowe formaty dla daty od i do)
test('Realtime_start and realtime_end have incorrect format', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&realtime_start=${date5}&realtime_end=${date5}`)
    expect(response.status()).toBeGreaterThanOrEqual(Constants.HTTP400)
    expect(response.status()).toBeLessThan(Constants.HTTP500)

    const responseBody = await response.text();
    expect(responseBody).toContain(Constants.error_message);
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla nieprawidłowego formatu dat (nieprawidłowy format dla daty do)
test('Realtime_end has incorrect format', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&realtime_end=${date5}`)
    expect(response.status()).toBeGreaterThanOrEqual(Constants.HTTP400)
    expect(response.status()).toBeLessThan(Constants.HTTP500)

    const responseBody = await response.text();
    expect(responseBody).toContain(Constants.error_message);
})
