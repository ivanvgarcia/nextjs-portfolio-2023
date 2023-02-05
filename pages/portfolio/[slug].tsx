import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { remark } from "remark";
import html from "remark-html";
import { motion, useScroll } from "framer-motion";

async function processMarkdown(content: string) {
  const processedContent = await remark().use(html).process(content);

  return processedContent.toString();
}

async function fetchPosts() {
  const response = await fetch(`${process.env.API_URL}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer e76af5efc61d5ac345616507f8210febd4f53aa35bfec5dbfeca8c6be2fd1189a727dfa696c34bb7d85d1521bb6f8e8482b9afcff976ef678bbb0babf1fbfd47439260fab81854ef6e83cbce03e2452ad35f573c9a3d9e5963b6725f92544f96239544ed87a97dc5db40d04e0c3df6c8c20f3aeb4f199e34c53b4b4f8e88f57e",
    },
  });

  return await response.json();
}

async function fetchPostBySlug(slug: string) {
  const response = await fetch(
    `${process.env.API_URL}/posts/${slug}?populate=cover`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer e76af5efc61d5ac345616507f8210febd4f53aa35bfec5dbfeca8c6be2fd1189a727dfa696c34bb7d85d1521bb6f8e8482b9afcff976ef678bbb0babf1fbfd47439260fab81854ef6e83cbce03e2452ad35f573c9a3d9e5963b6725f92544f96239544ed87a97dc5db40d04e0c3df6c8c20f3aeb4f199e34c53b4b4f8e88f57e",
      },
    }
  );

  return await response.json();
}

export async function getStaticPaths() {
  const posts = await fetchPosts();

  const paths = posts.data?.map((post: any) => ({
    params: { slug: post.attributes.slug },
  }));

  if (!paths) return { paths: [], fallback: false };

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = await fetchPostBySlug(params.slug);

  post.data.attributes.body = await processMarkdown(post.data.attributes.body);

  return {
    props: {
      post,
    },
  };
}

export default function Home({
  post: {
    data,
    data: {
      attributes: { title, cover, body },
    },
    errors,
  },
}: any) {
  const router = useRouter();

  const { scrollYProgress } = useScroll();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <>
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.section
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full mx-auto max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert"
      >
        <Head>
          <title>Ivan Garcia | Portfolio</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {errors && (
          <div className="error">An error occurred: {errors.message}</div>
        )}

        {!data && <div className="error">No posts found</div>}

        <h1>{title}</h1>

        <div
          className="relative mb-10"
          style={{ height: "350px", width: "100%" }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_ROOT_URL}${cover.data.attributes.url}`}
            alt={cover.data.attributes.alternativeText}
            width={cover.data.attributes.width}
            height={cover.data.attributes.height}
          />
        </div>

        <article
          className="font-normal text-gray-700 dark:text-gray-400"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </motion.section>
    </>
  );
}
