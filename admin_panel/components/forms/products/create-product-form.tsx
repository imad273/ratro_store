'use client';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import FileUpload from '@/components/file-upload';
import { RichTextInput } from '@/components/richTextEditor';
import supabase from '@/lib/supabaseClient';
import LoadingBadge from '@/components/loading/uploadLoading';
import { Plus, Trash } from 'lucide-react';
import { optionProps } from '@/types/products.types';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Product Name is required' }),
  images: z.array(
    z.any().refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png formats are supported."
      )
  ).nonempty("At least one item is required"),
  price: z.coerce.number().min(1, { message: "Price is required" }),
  availability: z.boolean().default(false).optional(),
  discount: z.boolean().default(false).optional(),
  discountPrice: z.coerce.number(),
  description: z
    .string()
    .min(3, { message: 'Product description is required' }),
  shortDescription: z
    .string()
    .min(3, { message: 'Short description is required' }),
  badge: z.string().min(1, { message: 'Please select a badge' }),
  options: z.array(z.any()).optional()
}).refine((data) => {
  if (data.discount === true) {
    return data.discountPrice >= 1
  }

  return true
}, { message: "Price after Discount is require", path: ['discountPrice'] });

type ProductFormValues = z.infer<typeof formSchema>;

export const CreateProductForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    name: '',
    description: '',
    shortDescription: '',
    images: [],
    price: 1,
    availability: true,
    discount: false,
    discountPrice: 1,
    badge: 'none',
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const [optionsPreset, setOptionsPreset] = useState<optionProps[]>([]);

  const createOptionField = () => {
    if (optionsPreset.length > 0 && optionsPreset[optionsPreset.length - 1].optionName === "") {
      return
    }

    setOptionsPreset(
      [
        ...optionsPreset,
        {
          optionName: "",
          optionValue: [
            ""
          ]
        }
      ]
    )
  }

  const createOptionValueField = (index: number) => {
    if (optionsPreset[index].optionValue.length > 0 && optionsPreset[index].optionValue[optionsPreset[index].optionValue.length - 1] === "") {
      return
    }

    const updatedArray = [...optionsPreset]; // Create a copy
    updatedArray[index].optionValue.push('');

    setOptionsPreset(updatedArray)
  }

  const changeOptionsNameValues = (type: "parent" | "children", value: string, parentIndex: number, childrenIndex: number = 0) => {
    const updatedArray = [...optionsPreset];
    if (type === "parent") {
      updatedArray[parentIndex].optionName = value;
    } else {
      updatedArray[parentIndex].optionValue[childrenIndex] = value;
    }

    setOptionsPreset(updatedArray)
  }

  function deleteOption(optionIndex: number) {
    const filtered = optionsPreset.filter((_: any, index: number) => index !== optionIndex);
    setOptionsPreset(filtered)
  }

  function deleteOptionValue(parentIndex: number, valueIndex: number) {
    const updatedOptions = [...optionsPreset];
    updatedOptions[parentIndex].optionValue.splice(valueIndex, 1);

    if (updatedOptions[parentIndex].optionValue.length === 0) {
      updatedOptions.splice(parentIndex, 1);
    }

    setOptionsPreset(updatedOptions)
  }

  useEffect(() => {
    form.setValue('options', optionsPreset)
  }, [optionsPreset])

  const onSubmit = async (dataValue: ProductFormValues) => {

    const isOptionHasEmptyFields = optionsPreset.some((option: any) => {
      return option.optionName === '' || option.optionValue.some((value: any) => value === '');
    });

    if (isOptionHasEmptyFields === true) {
      toast({
        variant: 'destructive',
        title: 'Complete the form please.',
        description: 'Options has empty fields.'
      });

      return
    }

    setLoading(true);

    const images = [];

    for (let i = 0; i < dataValue.images.length; i++) {
      const { data, error } = await supabase
        .storage
        .from('products_images')
        .upload(`public/product_${Date.now()}.png`, dataValue.images[i]);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong.',
          description: 'There was a problem with your request.'
        });

        return
      }

      images.push(data.fullPath)
    }

    const { error } = await supabase
      .from('products')
      .insert({
        name: dataValue.name,
        images: images,
        price: dataValue.price,
        availability: dataValue.availability,
        discount: dataValue.discount,
        discountPrice: dataValue.discountPrice,
        badge: dataValue.badge,
        description: dataValue.description,
        shortDescription: dataValue.shortDescription,
        options: dataValue.options,
      }).select()

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: 'There was a problem with your request.'
      });
      return
    } else {
      toast({
        variant: "success",
        description: "Product Added successfully",
      });

      setTimeout(() => router.push('/dashboard/products'), 2000)
    }

    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Create Product</h2>
        </div>
      </div>

      <Separator />

      <div className='relative'>
        {loading && <LoadingBadge />}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <FileUpload
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='false'
                      placeholder="Product Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-y-1'>
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center gap-2'>

                      <FormControl>
                        <Checkbox
                          id='availability'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />

                      </FormControl>
                      <label
                        htmlFor="availability"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Availability
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center gap-2'>

                      <FormControl>
                        <Checkbox
                          id='discount'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />

                      </FormControl>
                      <label
                        htmlFor="discount"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Discount
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid items-center grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input min={1} type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discountPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price after discount</FormLabel>
                    <FormControl>
                      <Input disabled={!form.getValues('discount')} min={1} type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='false'
                      placeholder="Product Short Description"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="badge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Badge</FormLabel>
                  <Select
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
                        none
                      </SelectItem>
                      <SelectItem value="Best seller">
                        Best seller
                      </SelectItem>
                      <SelectItem value="new">
                        New
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <RichTextInput description={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <h3 className='my-4 text-xl font-semibold'>Product Options</h3>
              <div className='mb-2'>
                <Button type='button' className="text-xs md:text-sm" onClick={() => createOptionField()}>
                  <Plus className="w-4 h-4 mr-2" /> Add Options
                </Button>
              </div>

              <div>
                {optionsPreset.length > 0 &&
                  <div className='space-y-2'>
                    {optionsPreset.map((option, index: number) => (
                      <div key={index} className='space-y-2'>
                        <div className='flex items-center gap-2'>
                          <Input
                            value={option.optionName}
                            onChange={(e) => changeOptionsNameValues("parent", e.target.value, index)}
                            placeholder='option name'
                          />
                          <Button type='button' className="px-2 text-xs" onClick={() => createOptionValueField(index)}>
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button type='button' className="px-2 text-xs bg-red-600 hover:bg-red-600/90" onClick={() => deleteOption(index)}>
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className='ml-6 space-y-2'>
                          {option.optionValue.map((value: string, valueIndex: number) => (
                            <div key={valueIndex} className='flex items-center gap-2'>
                              <Input
                                value={value}
                                onChange={(e) => changeOptionsNameValues("children", e.target.value, index, valueIndex)}
                                placeholder='option value'
                              />
                              <Button type='button' className="px-2 text-xs bg-red-600 hover:bg-red-600/90" onClick={() => deleteOptionValue(index, valueIndex)}>
                                <Trash className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                }
              </div>
            </div>

            <div className='flex justify-end pt-6'>
              <Button disabled={loading} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
