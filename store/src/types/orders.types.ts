import { ProductProps } from "./products.types";

export type OrdersProps = {
  id: string
  created_at: string
  order_status: string
  customer_name: string
  customer_email: string
  customer_phone_number: string
  customer_country: string
  shipping_address: string
  customer_city: string
  customer_state: string
  customer_zipcode: string
  payment_method: string
  products: ProductProps[]
  total_amount: number
  discount: number
  order_number: string
};