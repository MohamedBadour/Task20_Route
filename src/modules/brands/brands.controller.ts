import { Body, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { CustomCacheInterceptor } from "../../common/interceptors/custom-cache.interceptor";

interface Brand {
  id: number;
  name: string;
  slug: string;
}

const brands: Brand[] = [
  { id: 1, name: "Apple", slug: "apple" },
  { id: 2, name: "Samsung", slug: "samsung" },
  { id: 3, name: "Sony", slug: "sony" }
];

@Controller("brands")
export class BrandsController {
  @Get()
  @UseInterceptors(CustomCacheInterceptor)
  getAllBrands() {
    return { count: brands.length, brands };
  }

  @Post()
  createBrand(@Body("name") name: string) {
    const newBrand: Brand = {
      id: brands.length + 1,
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-")
    };
    brands.push(newBrand);
    return { message: "Brand created successfully", brand: newBrand };
  }
}
