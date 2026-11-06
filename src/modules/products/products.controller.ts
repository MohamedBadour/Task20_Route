import { Body, Controller, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { CustomCacheInterceptor } from "../../common/interceptors/custom-cache.interceptor";

interface Product {
  id: number;
  title: string;
  price: number;
  brand: string;
}

const products: Product[] = [
  { id: 1, title: "iPhone 15 Pro", price: 1200, brand: "Apple" },
  { id: 2, title: "Galaxy S24 Ultra", price: 1150, brand: "Samsung" },
  { id: 3, title: "Sony WH-1000XM5", price: 380, brand: "Sony" }
];

@Controller("products")
export class ProductsController {
  @Get()
  @UseInterceptors(CustomCacheInterceptor)
  getProducts(@Query("minPrice") minPrice?: string) {
    let list = products;
    if (minPrice) {
      const min = parseFloat(minPrice);
      list = products.filter((p) => p.price >= min);
    }
    return { count: list.length, products: list };
  }

  @Post()
  createProduct(@Body() body: { title: string; price: number; brand: string }) {
    const product: Product = {
      id: products.length + 1,
      title: body.title,
      price: body.price,
      brand: body.brand
    };
    products.push(product);
    return { message: "Product created successfully", product };
  }
}
