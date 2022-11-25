import '@testing-library/jest-dom';
import { server } from './test-utils/msw/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const localStorageMock = (function getStore() {
  let store: { [key: string]: string | number | boolean } = {};
  return {
    getItem: jest.fn().mockImplementation((key: string) => {
      return store[key] || null;
    }),
    setItem: jest
      .fn()
      .mockImplementation((key: string, value: string | number | boolean) => {
        store[key] = value;
      }),
    removeItem: jest.fn().mockImplementation((key: string) => {
      delete store[key];
    }),
    clear: jest.fn().mockImplementation(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
