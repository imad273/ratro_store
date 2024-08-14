"use client"

import React from 'react'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useCart from '@/zustand/cart';
import { LockKeyhole } from 'lucide-react';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'Your Name is required' }),
  emailAddress: z
    .string()
    .min(3, { message: 'Your Email is required' })
    .email({ message: "Invalid email address" }),
  phoneNumber: z.string()
    .min(3, { message: 'Your Phone number is required' })
    .regex(phoneRegex, 'Invalid Phone Number!'),
  country: z.string().optional(),
  streetAddress: z
    .string()
    .min(2, { message: 'Your Address is required' }),
  city: z
    .string()
    .min(2, { message: 'City is required' }),
  state: z
    .string()
    .min(2, { message: 'City is required' }),
  zipCode: z
    .string()
    .min(2, { message: 'City is required' }),
})

type ProductFormValues = z.infer<typeof formSchema>;

const page = () => {

  const defaultValues = {
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    country: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const { isLoading, productsCart } = useCart();

  const onSubmit = async (dataValue: ProductFormValues) => {

  }

  const calculateSubtotal = () => {
    const subtotal = productsCart.reduce((total, product) => {
      if (product.product.discount === true) {
        return total + product.product.discountPrice * product.quantity;
      }

      return total + product.product.price * product.quantity;
    }, 0);

    return subtotal;
  }

  const calculateTotal = () => {
    return calculateSubtotal();
  }

  return (
    <section className="min-h-screen container py-3">
      <h1 className='text-3xl font-bold py-2 text-headingText'>Checkout</h1>
      <div className='flex flex-col-reverse md:grid md:grid-cols-3 gap-3'>
        <div className='col-span-2'>
          <div className="flex">
            <div>
              <h3 className='font-semibold'>Shipping information</h3>

              <div className="py-2">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-3"
                  >
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="emailAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select
                            /* disabled={true} */
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={'none'}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={field.value}
                                  placeholder="Select a category"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">
                                United state
                              </SelectItem>
                              <SelectItem value="Best seller">
                                Canada
                              </SelectItem>
                              <SelectItem value="new">
                                Australia
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="streetAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-3 gap-3">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter City"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter State"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter ZIP Code"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button>
                      check
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
            <hr className="hidden md:block h-auto w-px mx-3 bg-gray-300 border-none" />
          </div>
        </div>

        <div className='col-span-1 pt-2 md:pt-0 pb-7 md:pb-0'>
          <h3 className='font-semibold'>Review your cart</h3>

          <div className='py-2'>
            {productsCart.map(product => (
              <div key={product.product.id} className="flex gap-5">
                <div>
                  <img
                    src={`${process.env.SUPABASE_URL}/storage/v1/object/public/${product.product.images[0]}`}
                    className='w-16 h-16 rounded-md'
                    alt="product"
                  />
                </div>
                <div className='flex-1'>
                  <h4 className='font-semibold truncate text-headingText'>{product.product.name}</h4>
                  <p className='text-sm font-semibold text-gray-500'>x{product.quantity}</p>
                  <p className='flex justify-end font-semibold'>${product.product.discount ? product.product.discountPrice * product.quantity : product.product.price * product.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='py-3'>
            <div className='flex justify-between items-center'>
              <h3 className='text-gray-500 font-semibold'>Subtotal</h3>
              <p className='font-semibold text-headingText'>${calculateSubtotal()}</p>
            </div>
            <div className='flex justify-between items-center'>
              <h3 className='text-gray-500 font-semibold'>Shipping</h3>
              <p className='font-semibold text-headingText'>$0</p>
            </div>
            <div className='flex justify-between items-center'>
              <h3 className='text-gray-500 font-semibold'>Tax</h3>
              <p className='font-semibold text-headingText'>$0</p>
            </div>
            <div className='py-3'>
              <h3 className='text-gray-500 font-semibold'>Discount Code</h3>
              <div className="flex w-full items-center space-x-2">
                <Input className="text-gray-700" type="text" placeholder="Code" />
                <Button className="bg-main text-white hover:bg-mainHover" type="submit">Apply</Button>
              </div>
            </div>

            <div className='flex justify-between items-center pt-1'>
              <h3 className='text-gray-500 font-semibold'>Discount</h3>
              <p className='font-semibold text-headingText'>$0</p>
            </div>

            <hr className="h-px my-3 bg-gray-300 border-none" />

            <div className='flex justify-between items-center'>
              <h3 className='text-gray-500 font-semibold'>Total</h3>
              <p className='font-semibold text-headingText'>${calculateTotal()}</p>
            </div>
          </div>

          <div className='flex items-center gap-2 text-sm font-semibold pt-2'>
            <LockKeyhole className='text-main' size={18} />
            Secure Checkout - SSL Encrypted
          </div>
        </div>
      </div>
    </section>
  )
}

export default page