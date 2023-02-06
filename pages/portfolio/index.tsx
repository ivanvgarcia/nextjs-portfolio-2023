import Head from "next/head";
import qs from "qs";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

async function fetchPosts() {
  const query = qs.stringify(
    {
      populate: ["cover", "technologies"],
      filters: {
        content_types: {
          name: {
            $eq: "portfolio",
          },
        },
      },
      fields: ["title", "slug"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await fetch(`${process.env.API_URL}/posts?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });

  return await response.json();
}

export async function getStaticProps() {
  const post = await fetchPosts();

  console.log(post.data[0]);
  return {
    props: {
      post,
    },
  };
}

export default function Home({ post: { data } }: any) {
  return (
    <section className="bg-gradient-to-b from-red-700 to-red-900 min-h-full">
      <Head>
        <title>Ivan Garcia | Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!data && <div className="text-white">No portfolios found</div>}

      <motion.h1
        initial={{ opacity: 1, transform: "translate(-50%, -50%);" }}
        animate={{ opacity: 0, scale: 0 }}
        transition={{ delay: 1.5 }}
        className="center-absolute text-6xl text-white font-light z-10 bg-gradient-to-r from-slate-600 to-slate-900 rounded-full px-8 pt-2 pb-4 border-8 border-white shadow-md"
      >
        Projects
      </motion.h1>

      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="grid grid-cols-1 md:grid-cols-2 relative h-full gap-4 p-4"
      >
        {data?.map((post: any) => {
          return (
            <Link
              href={`/portfolio/${post.attributes.slug}`}
              className="relative rounded-xl overflow-hidden bg-red-700 cursor-pointer drop-shadow group transition-all duration-300 ease-in-out min-h-[400px]"
              key={post.id}
            >
              <div className="absolute left-0 top-0 w-full h-full bg-slate-900/80 hover:bg-slate-900/40 z-10 flex flex-col justify-center items-center">
                <p className="text-white font-light tracking-wider text-2xl lg:text-5xl">
                  {post.attributes.title}
                </p>
                <br />
                <div>
                  {post.attributes.technologies.data?.map((tech: any) => {
                    return (
                      <Image
                        key={tech.id}
                        src={tech.attributes.url}
                        width={100}
                        height={100}
                        alt={tech.attributes.alternativeText}
                      />
                    );
                  })}
                </div>
              </div>

              <Image
                src={post.attributes.cover.data?.attributes.url}
                alt={post.attributes.title}
                fill
                style={{ objectFit: "cover" }}
                className="group-hover:scale-150 transition-transform duration-300 ease-in-out"
              />
            </Link>
          );
        })}
      </motion.div>
    </section>
  );
}
