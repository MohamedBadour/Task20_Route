import { Body, Controller, Post } from "@nestjs/common";

interface Coupon {
  code: string;
  discountPercentage: number;
  expireDate: Date;
}

const coupons: Coupon[] = [
  { code: "ROUTE20", discountPercentage: 20, expireDate: new Date("2027-12-31") },
  { code: "BADOUR50", discountPercentage: 50, expireDate: new Date("2027-12-31") }
];

@Controller("coupons")
export class CouponsController {
  @Post("validate")
  validateCoupon(@Body("code") code: string) {
    const coupon = coupons.find((c) => c.code === code.toUpperCase());
    if (!coupon) {
      return { valid: false, message: "Invalid coupon code" };
    }
    return { valid: true, discountPercentage: coupon.discountPercentage };
  }
}
