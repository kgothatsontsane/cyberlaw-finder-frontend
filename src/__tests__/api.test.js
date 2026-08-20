import '@testing-library/jest-dom';
import { searchLaws, checkHealth } from '@/lib/api';

const FAKE_URL = 'http://localhost:8000';

describe('searchLaws', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('sends a POST request with correct query and jurisdiction', async () => {
    const mockResponse = { results: [{ id: 'sa-001', title: 'Test Law', score: 0.95 }] };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await searchLaws({
      query: 'Someone hacked my email',
      jurisdiction: 'south_africa',
      top_k: 10,
    });

    expect(global.fetch).toHaveBeenCalledWith(`${FAKE_URL}/api/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'Someone hacked my email',
        jurisdiction: 'south_africa',
        top_k: 10,
      }),
    });
    expect(result).toEqual(mockResponse);
  });

  it('uses default top_k of 10 when not specified', async () => {
    const mockResponse = { results: [] };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await searchLaws({ query: 'test query' });

    const callBody = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(callBody.top_k).toBe(10);
  });

  it('sends undefined jurisdiction when not provided', async () => {
    const mockResponse = { results: [] };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await searchLaws({ query: 'test query' });

    const callBody = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(callBody.jurisdiction).toBeUndefined();
  });

  it('throws an error on HTTP error responses', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    });

    await expect(
      searchLaws({ query: 'test query' })
    ).rejects.toThrow('Search failed: Internal Server Error');
  });

  it('throws an error on network failure', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(
      searchLaws({ query: 'test query' })
    ).rejects.toThrow('Network error');
  });
});

describe('checkHealth', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls the correct health endpoint', async () => {
    const mockResponse = { status: 'healthy', vector_count: 75 };
    global.fetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    const result = await checkHealth();

    expect(global.fetch).toHaveBeenCalledWith(`${FAKE_URL}/api/health`);
    expect(result).toEqual(mockResponse);
  });

  it('returns parsed JSON from health endpoint', async () => {
    const mockResponse = { status: 'ok' };
    global.fetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    const result = await checkHealth();
    expect(result).toEqual({ status: 'ok' });
  });
});
