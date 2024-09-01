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
import { useEffect, useMemo, useState } from "react";
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
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="max-w-4xl px-4 text-2xl font-bold leading-relaxed text-center md:text-4xl lg:text-5xl text-headingText lg:leading-snug"
          >
            With Ratro, nothing&apos;s real. Everything is far away. Everything
            is a{" "}
            <Highlight className="text-gray-200">
              copy, of a copy, of a copy.
            </Highlight>
          </motion.h1>
        </HeroHighlight>
      </section>

      <section className="py-3 blured">
        <div className="container">
          {loading ?
            <ProductFetchSkeleton />
            :
            productsData.length === 0 ?
              <EmptyProducts from="products" />
              :
              <>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    ease: "easeOut",
                    duration: 0.5
                  }}
                >
                  <h1 className="py-5 text-4xl font-semibold text-center text-headingText">Trend Products</h1>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    ease: "easeOut",
                    duration: 0.5
                  }}
                >
                  <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-4">
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

                </motion.div>

              </>
          }
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          ease: "easeOut",
          duration: 0.5
        }}
      >
        <section className="min-h-[50vh] flex justify-center items-center bg-main py-8 text-white">
          <div className="relative w-full">
            <Line className="left-0 bg-gradient-to-l top-2 sm:top-4 md:top-6" />
            <Line className="left-0 bg-gradient-to-r bottom-2 sm:bottom-4 md:bottom-6" />

            <Line className="inset-y-0 w-px h-full bg-gradient-to-t right-2 sm:right-4 md:right-6" />
            <Line className="inset-y-0 w-px h-full bg-gradient-to-b left-2 sm:left-4 md:left-6" />

            <div className="container relative z-20 py-14">
              <div className="w-full px-3 md:px-0">
                <h3 className="pb-5 text-4xl font-semibold">Join Our Newsletter!</h3>
                <p className="w-5/6 pb-5">Subscribe to our newsletter and be the first to know about our latest products, exclusive offers, and special promotions. Simply enter your email below to stay updated!</p>

                <div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex w-full max-w-md gap-2"
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
                                className="w-full text-gray-700"
                                placeholder="Email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-white" />
                          </FormItem>
                        )}
                      />
                      <Button disabled={emailLoading} className="flex items-center justify-center text-gray-700 bg-white hover:bg-gray-200 hover:text-main" type="submit">Subscribe</Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99], bounce: 0.4 }}
      >

        <section id="about">
          <div className="bg-white min-h-screen h-screen md:min-h-[80vh] md:h-[80vh]">
            <div className='w-full h-full relative bg-grid-black/[0.1] px-4'>
              <div className='relative z-30 flex flex-col items-center justify-center h-full animate-moveUp'>
                <div
                  className={
                    'text-center font-bold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600'
                  }
                >
                  About us
                </div>
                <div className="py-2 text-lg font-semibold text-center text-gray-700">
                  We sell electronic products
                </div>

                <p className="w-full text-sm text-center md:w-4/6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae assumenda magnam, quis minima architecto consequuntur qui molestiae, ipsum et placeat, deleniti accusantium quaerat cupiditate quidem debitis iusto blanditiis cum itaque!</p>
              </div>

              <div className="absolute top-0 left-0 z-10 w-full bg-gradient-to-b from-white via-white to-transparent h-3/6">

              </div>
              {/* <div className={'absolute bottom-0 left-0 w-full h-full z-0 animate-appear opacity-0'}>
              <Lights />
            </div> */}
            </div>
          </div>
        </section>
      </motion.div>

      <section className="overflow-x-hidden min-h-screen md:min-h-[80vh] flex justify-center items-center" id="faq">
        <div className="container flex items-start justify-center w-full">
          <div className="w-full">
            <GridBeam className="flex items-start justify-start">
              <Accordion className="py-28">
                {questions.map((e, i) => {
                  return (
                    <Tab key={i}>
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          ease: "easeOut",
                          duration: 0.5
                        }}
                      >

                        <Trigger className="hover:translate-x-1.5 duration-200">{e.question}</Trigger>
                        <Content>{e.answer}</Content>
                      </motion.div>
                    </Tab>
                  )
                })}
              </Accordion>
            </GridBeam>
          </div>
        </div>
      </section>
    </main >
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