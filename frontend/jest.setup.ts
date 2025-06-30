import '@testing-library/jest-dom';

jest.mock('./env', () => ({
    VITE_API_BASE_URL: 'http://localhost:3000',
}));
