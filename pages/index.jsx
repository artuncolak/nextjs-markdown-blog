import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import Link from "next/link";
import { Card } from "react-bootstrap";
import Layout from "../components/Layout";

export default function Index({ posts }) {
  return (
    <>
      <Head>
        <title>Markdown Blog</title>
      </Head>
      <Layout>
        <div className="mt-5">
          {posts.map((post) => (
            <Card key={post.slug} className="mb-3 w-75 ml-auto mr-auto shadow">
              <Card.Body>
                <Card.Title className="text-primary font-weight-bold">
                  <Link href={`/post/${post.slug}`}>{post.title}</Link>
                </Card.Title>
                <Card.Subtitle className="text-muted">
                  {post.date}
                </Card.Subtitle>
                <Card.Text className="mt-3">{post.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(`${process.cwd()}/posts`);

  const posts = files
    .map((filename) => {
      const markdown = fs.readFileSync(`posts/${filename}`).toString();

      const { data } = matter(markdown);
      return {
        ...data,
        slug: filename.replace(/\.[^/.]+$/, ""),
        date: data.date.toLocaleDateString("tr-TR"),
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    props: { posts },
  };
}
