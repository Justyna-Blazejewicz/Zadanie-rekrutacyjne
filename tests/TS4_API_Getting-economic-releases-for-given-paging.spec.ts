import { test, expect } from '@playwright/test';
import { Constants } from './Constants';

const numbers1 = [1, 10, 1000];
const numbers2 = [0, 1001];
const numbers3 = [2, 0];

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla limitu danych równego 1, 10 oraz 1000
for (const number of numbers1) {
    test(`Limit is ${number}`, async ({ request }) => {
        const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&limit=${number}`)
        expect(response.status()).toBe(Constants.HTTP200)

        const responseBody = await response.json();
        if (responseBody.releases.length < responseBody.limit) {
            expect(responseBody.releases.length).toEqual(responseBody.count);
        } else {
            expect(responseBody.releases.length).toBe(number);
        }
    })
}

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla limitu danych równego 0 oraz 1001
for (const number of numbers2) {
    test(`Limit is ${number}`, async ({ request }) => {
        const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&limit=${number}`)
        expect(response.status()).toBeGreaterThanOrEqual(Constants.HTTP400)
        expect(response.status()).toBeLessThan(Constants.HTTP500)

        const responseBody = await response.text();
        expect(responseBody).toContain(Constants.error_message);
    })
}

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla offsetu równego 2, 0 oraz liczby większej lub równej ilości danych
for (const number of numbers3) {
    test(`Offset is ${number}`, async ({ request }) => {
        const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&offset=${number}`)
        expect(response.status()).toBe(Constants.HTTP200);

        const responseBody = await response.json();
        expect(responseBody.releases.length).toEqual(responseBody.count - responseBody.offset)
    })
}

test('Offset is greater or equal to the amout of objects in response body', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&offset=1000000`)
    expect(response.status()).toBe(Constants.HTTP200);

    const responseBody = await response.json();
    expect(responseBody.releases.length).toEqual(0)
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są wyciągane dla offsetu równego -1
test('Offset is -1', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&offset=-1`)
    expect(response.status()).toBeGreaterThanOrEqual(Constants.HTTP400)
    expect(response.status()).toBeLessThan(500)

    const responseBody = await response.text();
    expect(responseBody).toContain(Constants.error_message);
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są posortowane po parametrze release_id
test('Sorted by release_id ascending', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&order_by=release_id&sort_order=asc`)
    expect(response.status()).toBe(Constants.HTTP200)

    const responseBody = await response.json();

    const isSortedAscending = (arr: { id: number }[]): boolean => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].id < arr[i - 1].id) {
                return false;
            }
        }
        return true;
    };

    expect(isSortedAscending(responseBody.releases)).toBe(true)
})

test('Sorted by release_id descending', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&order_by=release_id&sort_order=desc`)
    expect(response.status()).toBe(Constants.HTTP200)

    const responseBody = await response.json();

    const isSortedDescending = (arr: { id: number }[]): boolean => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].id > arr[i - 1].id) {
                return false;
            }
        }
        return true;
    };

    expect(isSortedDescending(responseBody.releases)).toBe(true)
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są posortowane po parametrze name
test('Sorted by name ascending', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&order_by=name&sort_order=asc`)
    expect(response.status()).toBe(Constants.HTTP200)

    const responseBody = await response.json();

    const isSortedAscending = (arr: { name: string }[]): boolean => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].name.localeCompare(arr[i - 1].name, 'en', { ignorePunctuation: true }) < 0) {
                return false;
            }
        }
        return true;
    };

    expect(isSortedAscending(responseBody.releases)).toBe(true)
})

test('Sorted by name descending', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&order_by=name&sort_order=desc`)
    expect(response.status()).toBe(Constants.HTTP200)

    const responseBody = await response.json();

    const isSortedDescending = (arr: { name: string }[]): boolean => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].name.localeCompare(arr[i - 1].name, 'en', { ignorePunctuation: true }) > 0) {
                return false;
            }
        }
        return true;
    };

    expect(isSortedDescending(responseBody.releases)).toBe(true)
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są posortowane po parametrze press_release
test('Sorted by press_release ascending', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&order_by=press_release&sort_order=asc`)
    expect(response.status()).toBe(Constants.HTTP200)

    const responseBody = await response.json();

    const isSortedAscending = (arr: { press_release: boolean }[]): boolean => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].press_release < arr[i - 1].press_release) {
                return false;
            }
        }
        return true;
    };

    expect(isSortedAscending(responseBody.releases)).toBe(true)
})

test('Sorted by press_release descending', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&order_by=press_release&sort_order=desc`)
    expect(response.status()).toBe(Constants.HTTP200)

    const responseBody = await response.json();

    const isSortedDescending = (arr: { press_release: boolean }[]): boolean => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].press_release > arr[i - 1].press_release) {
                return false;
            }
        }
        return true;
    };

    expect(isSortedDescending(responseBody.releases)).toBe(true)
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są posortowane po parametrze realtime_start
test('Sorted by realtime_start ascending', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&order_by=realtime_start&sort_order=asc`)
    expect(response.status()).toBe(Constants.HTTP200);

    const responseBody = await response.json();

    const isSortedAscending = (arr: { realtime_start: string }[]): boolean => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].realtime_start < arr[i - 1].realtime_start) {
                return false;
            }
        }
        return true;
    };

    expect(isSortedAscending(responseBody.releases)).toBe(true)
})

test('Sorted by realtime_start descending', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&order_by=realtime_start&sort_order=desc`)
    expect(response.status()).toBe(Constants.HTTP200);

    const responseBody = await response.json();

    const isSortedDescending = (arr: { realtime_start: string }[]): boolean => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].realtime_start > arr[i - 1].realtime_start) {
                return false;
            }
        }
        return true;
    };

    expect(isSortedDescending(responseBody.releases)).toBe(true)
})

// Sprawdzenie poprawności działania czy dane ekonomiczne są posortowane po parametrze realtime_end
test('Sorted by realtime_end ascending', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&order_by=realtime_end&sort_order=desc`)
    expect(response.status()).toBe(Constants.HTTP200);

    const responseBody = await response.json();

    const isSortedAscending = (arr: { realtime_end: string }[]): boolean => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].realtime_end < arr[i - 1].realtime_end) {
                return false;
            }
        }
        return true;
    };

    expect(isSortedAscending(responseBody.releases)).toBe(true)
})

test('Sorted by realtime_end descending', async ({ request }) => {
    const response = await request.get(`?api_key=${Constants.correct_api_key}&file_type=json&order_by=realtime_end&sort_order=desc`)
    expect(response.status()).toBe(Constants.HTTP200);

    const responseBody = await response.json();

    const isSortedDescending = (arr: { realtime_end: string }[]): boolean => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].realtime_end > arr[i - 1].realtime_end) {
                return false;
            }
        }
        return true;
    };

    expect(isSortedDescending(responseBody.releases)).toBe(true)
})