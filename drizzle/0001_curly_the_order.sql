DROP INDEX IF EXISTS "post_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "name_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_idx" ON "Alrefa3eeBlog_comment" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "Alrefa3eeBlog_post" USING btree ("name");