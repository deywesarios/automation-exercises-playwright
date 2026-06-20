import type { APIRequestContext } from '@playwright/test';

export async function getProductsList(
  request: APIRequestContext,
) {
  return request.get(`${process.env.BASE_URL}/api/productsList`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function searchProduct(
  request: APIRequestContext,
  product: string,
) {
  return request.post(`${process.env.BASE_URL}/api/searchProduct`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: new URLSearchParams({ search_product: product }).toString(),
  });
}