import TagClient from "./tagClient";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import { ilike } from "drizzle-orm";

export default async function Tag({ tag }: { tag: string }) {
  const result = await db
    .select({
      id: posts.id,
      title: posts.title ?? "",
      slug: posts.slug ?? "",
      tags: posts.tags ?? "",
      description: posts.description ?? "",
      createdAt: posts.createdAt,
      readTime: posts.readTime ?? "",
    })
    .from(posts)
    .where(ilike(posts.tags, `%${tag}%`));

  return (
    <div>
      <TagClient result={result} />
    </div>
  );
}
