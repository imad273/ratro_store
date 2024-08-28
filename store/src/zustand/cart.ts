import { ProductProps } from '@/types/products.types';
import { create } from 'zustand';

type CartProps = {
  product: ProductProps
  quantity: number
}
type OptionsProps = {
  option: string,
  value: string
}

const useCart = create<({
  isLoading: boolean
  productsCart: CartProps[];
  selectedOptions: OptionsProps[]
  addItem: (product: ProductProps, quantity: number, selectedOptions: OptionsProps[]) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, action: 'increase' | 'decrease') => void;
  setIsLoading: (isLoadingNewValue: boolean) => void;
})>((set) => ({
  isLoading: true,
  productsCart: [],
  selectedOptions: [],
  addItem: (product: ProductProps, quantity: number, selectedOptions: OptionsProps[]) =>
    set((state) => ({
      productsCart: [...state.productsCart, { product, quantity, selectedOptions }]
    })),
  removeItem: (productId: number) =>
    set((state) => ({
      productsCart: state.productsCart.filter((item) => item.product.id !== productId)
    })),
  updateQuantity: (productId: number, action: 'increase' | 'decrease') =>
    set((state) => ({
      productsCart: state.productsCart.map((item) => {
        if (item.product.id === productId) {
          const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
          return newQuantity <= 0 ? item : { ...item, quantity: newQuantity };
        }
        return item;
      })
    })),
  setIsLoading: (isLoadingNewValue: boolean) => set({ isLoading: isLoadingNewValue })

}));

export default useCart;