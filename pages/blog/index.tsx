import Head from "next/head";
import qs from "qs";
import { Card } from "flowbite-react";
import Layout from "@/components/Layout";
import type { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";
import { motion } from "framer-motion";

async function fetchPosts() {
  const query = qs.stringify(
    {
      populate: "cover",
      filters: {
        content_types: {
          name: {
            $eq: "blog",
          },
        },
      },
      fields: ["title", "excerpt", "slug"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await fetch(`${process.env.API_URL}/posts?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer e76af5efc61d5ac345616507f8210febd4f53aa35bfec5dbfeca8c6be2fd1189a727dfa696c34bb7d85d1521bb6f8e8482b9afcff976ef678bbb0babf1fbfd47439260fab81854ef6e83cbce03e2452ad35f573c9a3d9e5963b6725f92544f96239544ed87a97dc5db40d04e0c3df6c8c20f3aeb4f199e34c53b4b4f8e88f57e",
    },
  });

  return await response.json();
}

export async function getStaticProps() {
  const post = await fetchPosts();

  return {
    props: {
      post,
    },
  };
}

const Home: NextPageWithLayout = ({ post: { data, errors } }: any) => {
  return (
    <section className="post-section min-h-screen">
      <Head>
        <title>Ivan Garcia | Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {errors && (
        <div className="error">An error occurred: {errors.message}</div>
      )}

      {!data && <div className="error">No posts found</div>}

      <header className="format format-sm sm:format-base lg:format-lg dark:format-invert py-10">
        <h1>Blog</h1>
      </header>

      <motion.div
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {data?.map((post: any) => {
          return (
            <Card
              horizontal
              key={post.id}
              imgSrc={`${process.env.NEXT_PUBLIC_ROOT_URL}${post.attributes.cover.data.attributes.url}`}
              className="cursor-pointer"
              href={`/blog/${post.attributes.slug}`}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {post.attributes.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {post.attributes.excerpt}
              </p>
            </Card>
          );
        })}
      </motion.div>
    </section>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
