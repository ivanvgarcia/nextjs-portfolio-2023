import Head from "next/head";
import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const line = "Ivan Garcia";
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  return (
    <>
      <Head>
        <title>Ivan Garcia | Home</title>
        <meta
          name="description"
          content="Ivan Garcia's Blog and Portolio Website"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="format format-invert">
        <motion.h2 variants={sentence} initial="hidden" animate="visible">
          <motion.svg viewBox="0 0 600 600" initial="hidden" animate="visible">
            {/* Letter I */}
            <motion.line
              x1="50"
              y1="0"
              x2="50"
              y2="100"
              stroke="#00cc88"
              variants={draw}
              strokeWidth="2"
            />

            {/* Letter V */}

            <motion.line
              x1="70"
              y1="0"
              x2="120"
              y2="100"
              stroke="#00cc88"
              variants={draw}
              strokeWidth="2"
            />

            <motion.line
              x1="120"
              y1="100"
              x2="170"
              y2="0"
              stroke="#00cc88"
              variants={draw}
              strokeWidth="2"
            />

            <motion.line
              x1="230"
              y1="0"
              x2="180"
              y2="100"
              stroke="#00cc88"
              variants={draw}
              strokeWidth="2"
            />

            <motion.line
              x1="280"
              y1="100"
              x2="230"
              y2="0"
              stroke="#00cc88"
              variants={draw}
              strokeWidth="2"
            />
          </motion.svg>

          {line.split("").map((char, index) => {
            return (
              <motion.span key={char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            );
          })}
        </motion.h2>
      </section>
    </>
  );
}
