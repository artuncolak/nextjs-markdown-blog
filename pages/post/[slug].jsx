import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const renderers = {
  code: ({ language, value }) => {
    return <SyntaxHighlighter language={language} children={value} />;
  },
};

export default function Post({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Layout>
        <div className="pl-5 pr-5">
          <h1 className="font-weight-bold mt-5 text-primary">{post.title}</h1>
          <p className="text-muted">{post.date}</p>
          <ReactMarkdown className="mt-5" renderers={renderers}>
            {post.content}
          </ReactMarkdown>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(`${process.cwd()}/posts`);
  const slugs = files.map((filename) => filename.replace(/\.[^/.]+$/, ""));

  return {
    paths: slugs.map((slug) => {
      return { params: { slug } };
    }),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const markdown = fs
    .readFileSync(`posts/${context.params.slug}.md`)
    .toString();
  const { data, content } = matter(markdown);
  const post = {
    ...data,
    date: data.date.toLocaleDateString("tr-TR"),
    content,
  };

  return {
    props: { post },
  };
}
