import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";
import CircularColorsDemo from "@/components/CircularColorsDemo";
import CodeSnippet from "@/components/CodeSnippet";

async function BlogPost({ params }) {
  const blog = await loadBlogPost(params.postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blog.frontmatter.title}
        publishedOn={blog.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          components={{
            DivisionGroupsDemo: DivisionGroupsDemo,
            CircularColorsDemo: CircularColorsDemo,
            Code: CodeSnippet,
          }}
          source={blog.content}
        />
      </div>
    </article>
  );
}

export async function generateMetadata({ params }) {
  const blog = await loadBlogPost(params.postSlug);
  return {
    title: blog.frontmatter.title,
    description: blog.frontmatter.abstract,
  };
}

export default BlogPost;
