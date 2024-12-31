import React from "react";

import ArticleCardsGroup from "~/components/article-cards-group";
import Poster from "./poster";
import { db } from "~/server/db";
import { asc } from "drizzle-orm";
import { posts } from "~/server/db/schema";
interface Item {
  title: string | null;
  id: number;
  slug: string | null;
  tags: string | null;
  description: string | null;
  views: number | null;
  createdAt: Date;
  updatedAt: Date | null;
  image: string | null;
  readTime: string | null;
}

interface article {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  views: number;
  slug: string;
  category: string;
}

const HomeClient = async () => {
  const [mostViewed, latest] = await Promise.all([
    db.query.posts.findMany({
      orderBy: [asc(posts.views)],
      limit: 3,
    }),
    db.query.posts.findMany({
      orderBy: [asc(posts.createdAt)],
      limit: 3,
    }),
  ]);
  // Sample data for the article cards
  const mostViewedArticles = mostViewed
    .map((item: Item) => {
      return {
        title: item.title ?? "",
        excerpt: item.description ?? "",
        date: item.createdAt.toISOString(),
        readTime: item.readTime ?? "",
        category: item.tags,
        slug: item.slug ?? "",
        image: item.image ?? "",
        views: item.views ?? 0,
      } as article;
    })
    .sort((a, b) => b.views - a.views);

  const latestArticles = latest
    .map((item: Item) => {
      return {
        title: item.title ?? "",
        excerpt: item.description ?? "",
        date: item.createdAt.toISOString(),
        readTime: item.readTime ?? "",
        category: item.tags,
        slug: item.slug ?? "",
        image: item.image ?? "",
      } as article;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="flex flex-col items-center justify-center">
      <Poster />
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-4">
        <ArticleCardsGroup
          dir="lft"
          title="Most Viewed"
          articles={mostViewedArticles}
        />
        <ArticleCardsGroup
          dir="rtl"
          title="Latest Articles"
          articles={latestArticles}
        />
      </div>
    </div>
  );
};

export default HomeClient;
