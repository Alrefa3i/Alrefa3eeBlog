// Define a type for the frontmatter data
export interface Frontmatter {
  title: string;
  tags?: string;
  [key: string]: unknown; // Allow additional metadata fields
}

// Define the return type for readMDXFile
export interface MDXFile {
  data: Frontmatter;
  content: string;
}
