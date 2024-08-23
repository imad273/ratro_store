'use client';

import { login } from '@/app/(auth)/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(3, { message: 'Password is require' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: '',
    password: ''
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const router = useRouter();

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);

    const result = await login(data);

    const { error } = JSON.parse(result);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: 'The email or password you entered is incorrect. Please check your credentials and try again.'
      });
    } else {
      toast({
        variant: "success",
        title: "Welcome!",
        description: "You’ve successfully logged in. Redirecting you to your dashboard.",
      });

      setTimeout(() => router.push('/dashboard'), 2000);
    }

    setLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your Password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-1">
            <Button disabled={loading} className="w-full" type="submit">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
