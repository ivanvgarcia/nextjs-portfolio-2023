import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { ReactElement } from "react";
import { remark } from "remark";
import html from "remark-html";
import { motion, useScroll } from "framer-motion";

import type { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/components/Layout";
import { fetchPosts, fetchPostBySlug } from "@/api/posts";

async function processMarkdown(content: string) {
  const processedContent = await remark().use(html).process(content);

  return processedContent.toString();
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

function hasURL(links: { url: string; github: string }) {
  return links?.url || links?.github;
}

const PortfolioPost: NextPageWithLayout = ({
  post: {
    data: {
      attributes: { title, cover, body, links, excerpt },
    },
    errors,
  },
}: any) => {
  const router = useRouter();

  const { scrollYProgress } = useScroll();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <section className="post-section">
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.section
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full mx-auto max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert"
      >
        <Head>
          <title>Ivan Garcia | Portfolio</title>
          <meta name="description" content={excerpt || "Portfolio"} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {errors && (
          <div className="error">An error occurred: {errors.message}</div>
        )}

        <h1 className="text-center">{title}</h1>

        {hasURL(links) && (
          <div className="mx-auto flex gap-4 justify-center">
            {links?.url && (
              <Link
                href={links.url}
                className="hover:cursor-pointer hover:scale-105 transition-all duration-200"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/website.png"
                  width={65}
                  height={65}
                  alt="website"
                  style={{ margin: 0 }}
                />
              </Link>
            )}
            {links?.github && (
              <Link
                href={links.github}
                className="hover:cursor-pointer hover:scale-105 transition-all duration-200"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/github.png"
                  width={65}
                  height={65}
                  alt="website"
                  style={{ margin: 0 }}
                />
              </Link>
            )}
          </div>
        )}

        <div className="relative lg:mb-10">
          <Image
            src={cover.data.attributes.url}
            alt={cover.data.attributes.alternativeText}
            width={cover.data.attributes.width}
            height={cover.data.attributes.height}
          />
        </div>

        <article
          className="font-normal text-slate-900 dark:text-white"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </motion.section>
    </section>
  );
};

PortfolioPost.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PortfolioPost;
