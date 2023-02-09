import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "flowbite-react";

export default function Home() {
  const line = "Ivan Garcia";

  const subtitle = "Software Engineer";

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

      <section className="home format format-invert h-full mx-auto max-w-full relative bg-white dark:bg-slate-800 py-4">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="grid grid-cols-1 lg:grid-cols-2 mx-2 lg:mx-4 px-6 lg:px-10 h-full bg-red-800 rounded-lg drop-shadow-lg"
        >
          <motion.div
            variants={sentence}
            initial="hidden"
            animate="visible"
            className="py-12 lg:py-56"
          >
            <div className="inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200 no-underline mb-5">
              <span className="px-1 lg:px-3 text-white text-sm font-semibold leading-5 bg-red-700 rounded-full py-0.5">
                Need a website?
              </span>

              <Link
                href="https://www.linkedin.com/in/ivanvgarcia"
                passHref={true}
                className="no-underline hover:underline"
              >
                <span className="ml-4 text-sm pr-2">
                  Contact Me On LinkedIn
                </span>
              </Link>
            </div>

            <h1 className="mb-0 lg:text-6xl text-gray-800 dark:text-white">
              {line.split("").map((char, index) => {
                return (
                  <motion.span key={char + "-" + index} variants={letter}>
                    {char}
                  </motion.span>
                );
              })}
            </h1>

            <h2 className="lg:text-5xl mb-4 text-slate-900">
              {subtitle.split("").map((char, index) => {
                return (
                  <motion.span key={char + "-" + index} variants={letter}>
                    {char}
                  </motion.span>
                );
              })}
            </h2>

            <p className="lg:text-xl text-white">
              Over 5 years of experience developing websites for clients
              worldwide. Experienced with Vue.js, React.js, Next.js, Node.js,
              Ruby on Rails and more.
            </p>

            <p className="lg:text-xl text-white">
              I&apos;m currently looking for a new role as a Software Engineer.
              If you need a website or have a project that needs coding, feel
              free to contact me. I&apos;d love to hear from you!
            </p>

            <Button.Group>
              <Button color="dark" className="no-underline" href="/blog">
                Blog
              </Button>
              <Button color="dark" className="no-underline" href="/portfolio">
                Portfolio
              </Button>
            </Button.Group>
          </motion.div>

          <div className="relative">
            <Image
              src="/images/ivan_nobg.png"
              alt="Ivan Garcia"
              width={1200}
              height={1200}
              className="absolute left-20 lg:left-0 md:left-32 xl:left-56 bottom-0 m-0 w-4/5 lg:w-3/5"
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}
