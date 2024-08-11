export type ProductProps = {
  id: number
  availability: boolean
  badge: string
  created_at: string
  description: string
  discount: boolean
  discountPrice: number
  images: string[]
  name: string
  price: number
  shortDescription: string
  options: optionProps[]
};

export type optionProps = {
  optionName: string,
  optionValue: string[]
};