import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type MDXFile, type Frontmatter } from "~/types";

// Read and parse the MDX file with type safety
async function readMDXFile(fileName: string): Promise<MDXFile> {
  const rawContent = fs.readFileSync(
    path.join(process.cwd(), "src/content", `${fileName}.mdx`),
    "utf-8",
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { data, content } = matter(rawContent);

  // Ensure `data` is of the expected type
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid frontmatter format");
  }

  // Optional runtime validation for required fields
  if (!("title" in data) || !("slug" in data)) {
    throw new Error("Frontmatter must include 'title' and 'date'");
  }

  return { data: data as Frontmatter, content };
}

export default readMDXFile;
