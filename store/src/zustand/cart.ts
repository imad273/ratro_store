import { ProductProps } from '@/types/products.types';
import { create } from 'zustand';

type CartProps = {
  product: ProductProps
  quantity: number
}

const useCart = create<({
  productsCart: CartProps[];
  addItem: (product: ProductProps, quantity: number) => void;
  removeItem: (productId: number) => void;
})>((set) => ({
  productsCart: [],
  addItem: (product: ProductProps, quantity: number) =>
    set((state) => ({
      productsCart: [...state.productsCart, { product, quantity }]
    })),
  removeItem: (productId: number) =>
    set((state) => ({
      productsCart: state.productsCart.filter((item) => item.product.id !== productId)
    }))
}));

export default useCart;