/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "~/components/ui/badge";
import { MDXRemote } from "next-mdx-remote";

import { type Frontmatter } from "~/types";
import Link from "next/link";
function ClientPlog({ data, md }: { data: Frontmatter; md: any }) {
  return (
    <div className="container mx-auto p-4 lg:max-w-screen-lg">
      <div className="info my-5 flex w-full items-end justify-between">
        <h1 className="w-1/2 text-3xl">{data.title}</h1>
        <div className="flex w-1/3 items-end justify-start">
          {data.tags?.split(",").map((tag, index) => {
            return (
              <Badge
                key={index}
                variant="secondary"
                className="h-8text-center mr-1 w-fit px-4 text-sm"
              >
                <Link
                  href={`/tags/${tag.trim()}`}
                  className="w-full text-center"
                >
                  {tag}
                </Link>
              </Badge>
            );
          })}
        </div>
      </div>
      <article className="content">
        <MDXRemote {...md} />
      </article>
    </div>
  );
}

export default ClientPlog;
