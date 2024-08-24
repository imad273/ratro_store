"use client"

import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/heroHighlight";
import { Accordion, Content, Tab, Trigger } from '@/components/ui/accordion'
import { GridBeam } from "@/components/ui/gridBeam";
import { ShinyTextButton } from "@/components/ui/shinyTextButton";
import { ArrowRightIcon } from "lucide-react";
import { toast } from '@/components/ui/use-toast';
import { Button } from "@/components/ui/button"
import { Product } from "@/components";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { ProductProps } from "@/types/products.types";
import ProductFetchSkeleton from "@/components/loading/productFetchSkeleton";
import EmptyProducts from "@/components/emptyAlerts/EmptyProducts";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl
} from "@/components/ui/form";

const formSchema = z.object({
  emailAddress: z
    .string()
    .min(3, { message: 'Your Email is required' })
    .email({ message: "Invalid email address" }),
})

type EmailFormValues = z.infer<typeof formSchema>;

export default function Home() {
  // FAQ Questions
  const questions = [
    {
      question: "What's the best manga ever written and why?",
      answer: `Berserk. It's about a warrior born from a dead flesh of a hanged mother, marked by the brand of sacrifice by apostles of the devil themselves. But he never gave a fuck and fought them as if he were immortal, despite the unending enemies and absence of hope for escape. Through his endless struggle, he became a creator of his own destiny and escaped unavoidable death at the Eclipse.`
    },
    { question: 'How to get kawai waifu?', answer: 'stop watching anime, hit the gym, go to japan' },
    {
      question: 'Who is behind this project?',
      answer: 'Dude named Luka Donadze (@lukachodonadze)'
    }
  ];

  const [productsData, setProductsData] = useState<ProductProps[]>([])
  const [loading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select().eq('availability', true).limit(4)

      if (!error) {
        setProductsData(data);
        setIsLoading(false)
      }
    }

    fetchProducts();
  }, [])

  const defaultValues = {
    emailAddress: '',
  };

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const [emailLoading, setEmailLoading] = useState(false)

  const onSubmit = async (dataValue: EmailFormValues) => {
    setEmailLoading(true);
    const { error } = await supabase
      .from('clients_submissions')
      .insert({
        email: dataValue.emailAddress
      });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: 'There was a problem with your request.'
      });
      return
    } else {
      toast({
        variant: 'success',
        title: 'Successfully Received',
        description: 'Your email has been successfully eeceived'
      });
    }

    setEmailLoading(false);
  }

  return (
    <main>
      <section className="min-h-[80vh]">
        <HeroHighlight>
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-headingText max-w-4xl leading-relaxed lg:leading-snug text-center"
          >
            With Ratro, nothing&apos;s real. Everything is far away. Everything
            is a{" "}
            <Highlight className="text-gray-200">
              copy, of a copy, of a copy.
            </Highlight>
          </motion.h1>
        </HeroHighlight>
      </section>

      <section className="blured py-3">
        <div className="container">
          {loading ?
            <ProductFetchSkeleton />
            :
            productsData.length === 0 ?
              <EmptyProducts from="products" />
              :
              <>
                <h1 className="text-headingText text-4xl text-center font-semibold py-5">Trend Products</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
                  {productsData.map(product => (
                    <Product key={product.id} productData={product} />
                  ))}
                </div>

                <div className="flex justify-end py-10">
                  <Link href="/products">
                    <ShinyTextButton className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-700 hover:duration-300">
                      <span>✨ See All Products</span>
                      <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </ShinyTextButton>
                  </Link>
                </div>
              </>
          }
        </div>
      </section>

      <section className="min-h-[50vh] flex justify-center items-center bg-main py-8 text-white">
        <div className="relative w-full">
          <Line className="bg-gradient-to-l left-0 top-2 sm:top-4 md:top-6" />
          <Line className="bg-gradient-to-r bottom-2 sm:bottom-4 md:bottom-6 left-0" />

          <Line className="w-px bg-gradient-to-t right-2 sm:right-4 md:right-6 h-full inset-y-0" />
          <Line className="w-px bg-gradient-to-b left-2 sm:left-4 md:left-6 h-full inset-y-0" />

          <div className="container relative z-20 py-14">
            <div className="w-full px-3 md:px-0">
              <h3 className="text-4xl pb-5 font-semibold">Join Our Newsletter!</h3>
              <p className="w-5/6 pb-5">Subscribe to our newsletter and be the first to know about our latest products, exclusive offers, and special promotions. Simply enter your email below to stay updated!</p>

              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full flex max-w-md gap-2"
                  >
                    <FormField
                      control={form.control}
                      name="emailAddress"
                      render={({ field }) => (
                        <FormItem className="flex-[1]">
                          <FormControl>
                            <Input
                              disabled={emailLoading}
                              type="email"
                              className="text-gray-700 w-full"
                              placeholder="Email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-white" />
                        </FormItem>
                      )}
                    />
                    <Button disabled={emailLoading} className="bg-white text-gray-700 hover:bg-gray-200 hover:text-main flex justify-center items-center" type="submit">Subscribe</Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="bg-white min-h-screen h-screen md:min-h-[80vh] md:h-[80vh]">
          <div className='w-full h-full relative bg-grid-black/[0.1] px-4'>
            <div className='relative h-full flex-col flex items-center justify-center z-30 animate-moveUp'>
              <div
                className={
                  'text-center font-bold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600'
                }
              >
                About us
              </div>
              <div className="text-gray-700 text-lg py-2 text-center font-semibold">
                We sell electronic products
              </div>

              <p className="w-full text-sm md:w-4/6 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae assumenda magnam, quis minima architecto consequuntur qui molestiae, ipsum et placeat, deleniti accusantium quaerat cupiditate quidem debitis iusto blanditiis cum itaque!</p>
            </div>

            <div className="absolute top-0 bg-gradient-to-b from-white via-white to-transparent w-full h-3/6 left-0 z-10">

            </div>
            {/* <div className={'absolute bottom-0 left-0 w-full h-full z-0 animate-appear opacity-0'}>
              <Lights />
            </div> */}
          </div>
        </div>
      </section>

      <section className="min-h-[80vh]" id="faq">
        <div className="container flex w-full items-start justify-center">
          <div className="w-full">
            <GridBeam className="sm:pl-16 pt-28 pl-4 flex items-start justify-start">
              <Accordion>
                {questions.map((e, i) => {
                  return (
                    <Tab key={i}>
                      <Trigger className="hover:translate-x-1.5 duration-200">{e.question}</Trigger>
                      <Content>{e.answer}</Content>
                    </Tab>
                  )
                })}
              </Accordion>
            </GridBeam>
          </div>
        </div>
      </section>
    </main>
  );
}

// Lines in the Newsletter section 
const Line = ({ className = "" }) => (
  <div
    className={cn(
      "h-px w-full from-white to-zinc-400 absolute -z-0",
      className
    )}
  />
)