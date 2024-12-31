import { sql } from "drizzle-orm";

import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  slug: varchar("slug", { length: 256 }).unique(),
  tags: text("tags"),
  description: text("description"),
  image: varchar("image", { length: 256 }),
  views: integer("views").default(0),
  readTime: varchar("read_time", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const postsRelations = relations(posts, ({ many }) => ({
  comments: many(comments),
}));

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  author_name: varchar("author", { length: 256 }),
  author_email: varchar("email", { length: 256 }),
  content: text("content"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
  postId: integer("post_id"),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));
