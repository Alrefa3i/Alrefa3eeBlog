import React from "react";
import readMDXFile from "~/content/utlis";
import ClientPlog from "./ClientPlog";
import { serialize } from "next-mdx-remote/serialize";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import { eq } from "drizzle-orm";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const [mdxConent] = await Promise.all([
      readMDXFile(slug),
      incrementPostViews(slug),
    ]);

    const mdxSource = await serialize(mdxConent.content);

    return <ClientPlog data={mdxConent.data} md={mdxSource} />;
  } catch {
    return <div>Error </div>;
  }
}

async function incrementPostViews(slug: string) {
  try {
    // Retrieve the current views count
    const post = await db
      .select({ views: posts.views })
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);

    if (post.length === 0) {
      throw new Error(`Post with slug "${slug}" not found`);
    }

    const currentViews = post[0]?.views;

    // Update the views count by incrementing it by 1
    await db
      .update(posts)
      .set({ views: (currentViews ?? 0) + 1 })
      .where(eq(posts.slug, slug));

    return null;
  } catch (error) {
    console.error("Failed to update views:", error);
    return null;
  }
}
