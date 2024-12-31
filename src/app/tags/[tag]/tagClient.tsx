import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { CalendarDays, Clock } from "lucide-react";
import Link from "next/link";

interface TagClientProps {
  id: number;
  title: string | null;
  slug: string | null;
  tags: string | null;
  description: string | null;
  createdAt: Date;
  readTime: string | null;
}

export default function TagClient({ result }: { result: TagClientProps[] }) {
  return (
    <div className="container mx-auto grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:max-w-screen-lg lg:grid-cols-3">
      {result.map((article, index) => (
        <Link prefetch={true} key={index} href={`/${article.slug}`}>
          <Card className="flex h-full flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              <CardDescription>
                <Badge variant="secondary">{article.slug}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                {article.description ? article.description.slice(0, 100) : ""}
                ...
              </p>
              <div className="flex items-center space-x-4">
                <div>
                  <div className="flex items-center text-xs text-gray-500">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {new Date(article.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                {article.readTime}
              </div>
              <Button variant="outline">Read More</Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
