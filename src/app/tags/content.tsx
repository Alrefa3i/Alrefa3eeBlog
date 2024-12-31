import { Separator } from "~/components/ui/separator";
import Link from "next/link";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import { Button } from "~/components/ui/button";

// Define the type of a row in the Posts table
type PostRow = {
  tags: string | string[] | null; // Adjust based on the actual database schema
};

async function GetAllTags(): Promise<JSX.Element> {
  // Query to fetch all `tags` from the Posts table
  const result = await db
    .select({
      tags: posts.tags,
    })
    .from(posts);

  // Extract and normalize tags
  const allTags = result
    .flatMap((row: PostRow) =>
      Array.isArray(row.tags)
        ? row.tags
        : typeof row.tags === "string" && row.tags.includes(",")
          ? row.tags.split(",")
          : [row.tags],
    )
    .filter((tag): tag is string => !!tag) // Ensure non-null, non-undefined tags
    .map((tag) => tag.trim().toLowerCase()); // Normalize case and trim whitespace

  // Calculate tag counts
  const tagCount: Record<string, number> = allTags.reduce(
    (acc, tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Return a React component displaying the tags and their counts
  return (
    <div className="mx-auto flex min-h-[calc(50vh)] max-w-xl items-center justify-center gap-4">
      <div className="grid place-items-center">
        <h2 className="text-8xl text-sky-800 dark:text-sky-400">Tags</h2>
      </div>
      <Separator className="h-10 bg-foreground" orientation="vertical" />
      <div className="flex max-h-40 w-1/2 flex-wrap items-center justify-start gap-1">
        {Object.entries(tagCount).map(([tag, count]) => (
          <Button variant="ghost" key={tag}>
            <Link className="text-secondary-foreground" href={`tags/${tag}`}>
              {tag.toUpperCase()} ( {count} )
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default GetAllTags;
