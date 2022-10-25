import { addToLocalStorage, getFromLocalStorage } from '../../../app/utils/sessionManager';

describe('SessionManager', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2020, 3, 1));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn(),
      },
    });
  });

  test('adds an object to the localStorage', () => {
    addToLocalStorage('test', { test: true }, 3);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'test',
      JSON.stringify({
        object: {
          test: true,
        },
        expiry: new Date().getTime() + 3,
      }),
    );
  });

  test('retrieves an existing object in local storage', () => {
    const getItemSpy = jest.spyOn(localStorage, 'getItem');

    getItemSpy.mockImplementation(() => JSON.stringify({ object: { test: true }, expiry: new Date().getTime() + 3 }));

    const object = getFromLocalStorage('test');

    expect(localStorage.getItem).toHaveBeenCalledWith('test');
    expect(object).toStrictEqual({ test: true });
  });

  test('should return null for expired storage', () => {
    const getItemSpy = jest.spyOn(localStorage, 'getItem');

    getItemSpy.mockImplementation(() => JSON.stringify({ object: { test: true }, expiry: new Date().getTime() - 3 }));

    const object = getFromLocalStorage('test');

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(object).toBeNull();
  });

  test('should return null for empty storage', () => {
    const object = getFromLocalStorage('test');

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(object).toBeNull();
  });
});
