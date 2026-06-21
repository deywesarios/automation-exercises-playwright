import { test, expect } from '@playwright/test';
import { 
    getProductsList,
    searchProduct
} from '../../api/productsApi';

test.describe('API Products', () => {
  test('Get all products list', async ({ request }) => {
    const response = await getProductsList(request);
    const body = await response.json();
    const blueTop = body.products.find((p: any) => p.id === 1);
    
    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.products).toBeInstanceOf(Array);
    expect(body.products.length).toBeGreaterThan(0);

    body.products.forEach((product: any) => {
        expect(product).toEqual(
            expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(String),
            brand: expect.any(String),
            category: expect.any(Object),
            })
        );
    });

    expect(blueTop).toEqual(
        expect.objectContaining({
            id: 1,
            name: 'Blue Top',
            price: 'Rs. 500',
            brand: 'Polo',
        })
    );
  });

  test('Search for a product', async ({ request }) => {
    const responseProductList = await getProductsList(request);
    const productListBody = await responseProductList.json();
    const products = productListBody.products;
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const response = await searchProduct(request, randomProduct.name);
    const body = await response.json();
    const searchedProduct = body.products.find((p: any) => p.id === randomProduct.id);

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.products).toBeInstanceOf(Array);
    expect(body.products.length).toBeGreaterThan(0);
    expect(searchedProduct).toBeDefined();
    expect(searchedProduct).toEqual(
        expect.objectContaining({
            id: randomProduct.id,
            name: randomProduct.name,
            price: randomProduct.price,
            brand: randomProduct.brand,
            category: randomProduct.category,
        })
    );

  });
});
