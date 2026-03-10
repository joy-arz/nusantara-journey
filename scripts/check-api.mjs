#!/usr/bin/env node
/**
 * API contract check: hits the backend /api/products (and optionally /api/conversations)
 * when the server is running. Run with: node scripts/check-api.mjs
 * Requires the server to be running on EXPO_PUBLIC_DOMAIN or localhost:5000.
 */
const baseUrl = process.env.EXPO_PUBLIC_DOMAIN || 'localhost:5000';
const protocol = baseUrl.startsWith('localhost') ? 'http' : 'https';
const url = `${protocol}://${baseUrl}`;

async function checkProducts() {
  const res = await fetch(`${url}/api/products`);
  if (!res.ok) throw new Error(`/api/products returned ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('/api/products did not return an array');
  return data.length;
}

async function main() {
  try {
    const count = await checkProducts();
    console.log(`OK /api/products returned ${count} product(s)`);
    process.exit(0);
  } catch (err) {
    console.error('API check failed:', err.message);
    process.exit(1);
  }
}

main();
