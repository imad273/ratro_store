"use client"

import LoadingBadge from '@/components/loading/uploadLoading';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import supabase from '@/lib/supabaseClient';
import { StoreSettingsFormValues } from '@/types/settings.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'

const formSchema = z.object({
  promotionSign: z.boolean().default(false).optional(),
  promotionSignText: z.string().optional(),
  showUnavailableProduct: z.boolean().default(false).optional(),
}).refine((data) => {
  if (data.promotionSign === true) {
    return data.promotionSignText !== ""
  }

  return true
}, { message: "Promotion sign text is require", path: ['promotionSignText'] });

const StoreSettingsForm = () => {
  const { toast } = useToast();

  const defaultValues = {
    promotionSign: true,
    promotionSignText: "",
    showUnavailableProduct: true,
  };

  const form = useForm<StoreSettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const [settingsData, setSettingsData] = useState<StoreSettingsFormValues>()
  const [loading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from('settings')
        .select()

      if (!error) {
        setSettingsData(data[0])
      }
    }

    fetchSettings();
  }, [])


  useEffect(() => {
    if (settingsData) {
      form.setValue('promotionSign', settingsData.promotionSign)
      form.setValue('promotionSignText', settingsData.promotionSignText)
      form.setValue('showUnavailableProduct', settingsData.showUnavailableProduct)
      setIsLoading(false)
    }
  }, [settingsData])

  const onSubmit = async (dataValue: StoreSettingsFormValues) => {
    setIsLoading(true);
    const { error } = await supabase
      .from('settings')
      .update({
        promotionSign: dataValue.promotionSign,
        promotionSignText: dataValue.promotionSignText,
      }).eq('id', 1)
    // 1 is the id the settings row, which is the first of course

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
        description: "Settings Updated successfully",
      });
    }

    setIsLoading(false);
  }

  return (
    <div>
      <div className='relative'>
        {loading && <LoadingBadge />}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4">
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name="promotionSign"
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center gap-2'>
                      <FormControl>
                        <Checkbox
                          id='promotionSign'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />

                      </FormControl>
                      <label
                        htmlFor="promotionSign"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Promotion Sign
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="promotionSignText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promotion Sign Text</FormLabel>
                    <FormControl>
                      <Input disabled={!form.getValues('promotionSign')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="showUnavailableProduct"
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center gap-2'>
                      <FormControl>
                        <Checkbox
                          id='showUnavailableProduct'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />

                      </FormControl>
                      <label
                        htmlFor="showUnavailableProduct"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Show Unavailable Product
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex justify-end pt-6'>
              <Button disabled={loading} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default StoreSettingsForm