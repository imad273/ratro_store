"use client"

import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/heroHighlight";
import { Accordion, Content, Tab, Trigger } from '@/components/ui/accordion'
import { GridBeam } from "@/components/ui/gridBeam";
import { ShinyTextButton } from "@/components/ui/shinyTextButton";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

// Images
import productImg1 from "@/assets/product-1.jpg";
import productImg2 from "@/assets/product-2.jpg";
import productImg3 from "@/assets/product-3.jpg";
import productImg4 from "@/assets/product-4.jpg";

import { Button } from "@/components/ui/button"
import { Product } from "@/components";

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
  ]

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
        <h1 className="text-headingText text-4xl text-center font-semibold py-5">Trend Products</h1>

        <div className="container">
          <div className="grid grid-cols-4 gap-6 py-6">
            <Product img={productImg1} name={"Unspel"} discount={false} discountPrice={0} price={29.99} />
            <Product img={productImg2} name={"CyberEar"} discount={true} discountPrice={29.99} price={49.99} />
            <Product img={productImg3} name={"Viseput"} discount={false} discountPrice={0} price={89.99} />
            <Product img={productImg4} name={"Neon Pack"} discount={true} discountPrice={59.99} price={79.99} />
          </div>

          <div className="flex justify-end py-10">
            <ShinyTextButton className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-700 hover:duration-300">
              <span>✨ See All Products</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </ShinyTextButton>
          </div>
        </div>
      </section>

      <section className="min-h-[80vh]">
        <div className="container flex w-full items-start justify-center">
          <div className="w-full">
            <GridBeam className="sm:pl-16 pt-28 pl-4 flex items-start justify-start">
              <Accordion>
                {questions.map((e, i) => {
                  return (
                    <Tab key={i}>
                      <Trigger>{e.question}</Trigger>
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
