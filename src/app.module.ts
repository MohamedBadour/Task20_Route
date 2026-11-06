import { Module } from "@nestjs/common";
import { BrandsModule } from "./modules/brands/brands.module";
import { ProductsModule } from "./modules/products/products.module";
import { CouponsModule } from "./modules/coupons/coupons.module";

@Module({
  imports: [BrandsModule, ProductsModule, CouponsModule]
})
export class AppModule {}
