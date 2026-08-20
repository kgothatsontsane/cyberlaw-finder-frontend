const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Search for cybercrime laws using NLP semantic search.
 * @param {Object} params
 * @param {string} params.query - User's cybercrime scenario
 * @param {string} [params.jurisdiction] - Jurisdiction filter
 * @param {number} [params.top_k=10] - Number of results
 * @returns {Promise<Object>} Search results with law matches
 */
export async function searchLaws({ query, jurisdiction, top_k = 10 }) {
  const response = await fetch(`${API_URL}/api/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, jurisdiction, top_k }),
  });

  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Check API health status.
 * @returns {Promise<Object>} Health check response
 */
export async function checkHealth() {
  const response = await fetch(`${API_URL}/api/health`);
  return response.json();
}

/**
 * Browse the complete law library with optional filters.
 * @param {Object} params
 * @param {string} [params.jurisdiction] - Filter by jurisdiction
 * @param {string} [params.category] - Filter by crime category
 * @param {string} [params.search] - Search by title, name, or keywords
 * @returns {Promise<Object>} Laws array with metadata
 */
export async function listLaws({ jurisdiction, category, search } = {}) {
  const params = new URLSearchParams();
  if (jurisdiction) params.set("jurisdiction", jurisdiction);
  if (category) params.set("category", category);
  if (search) params.set("search", search);

  const url = `${API_URL}/api/laws${params.toString() ? "?" + params.toString() : ""}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load laws: ${response.statusText}`);
  }

  return response.json();
}
