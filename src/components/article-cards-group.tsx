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
import Image from "next/image";
interface ArticleCardsGroupProps {
  dir: string;
  title: string;
  articles: {
    title: string;
    slug: string;
    image: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    views: number;
  }[];
}

export default async function ArticleCardsGroup({
  dir,
  title,
  articles,
}: ArticleCardsGroupProps) {
  const mainCard = articles[0];
  articles = articles.slice(1);
  return (
    <div className={`container mx-auto p-4 lg:max-w-screen-lg`}>
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <div>
        <div className="container mx-auto flex gap-4">
          {/* main card */}
          <div className={`${dir === "rtl" ? "order-1" : null} flex-grow`}>
            <Card className="mx-auto flex h-full flex-col">
              <div className="px-4 py-4">
                <Image
                  src={`/images/${mainCard?.image}`}
                  width={400}
                  height={200}
                  alt={""}
                  className="mx-auto object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">
                  {mainCard?.title}
                </CardTitle>
                <CardDescription>
                  <Badge variant="secondary">
                    {mainCard?.category.split(",")[0]}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                  {mainCard?.excerpt}
                </p>
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center text-xs text-gray-500">
                      <CalendarDays className="mr-1 h-3 w-3" />
                      {new Date(
                        mainCard?.date ?? Date.now(),
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  {mainCard?.readTime} min
                </div>
                <Link prefetch={true} href={`/${mainCard?.slug}`}>
                  <Button variant="outline">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="mx-auto flex flex-col gap-4">
            {articles.map((article, index) => (
              <Link prefetch={true} key={index} href={`/${article.slug}`}>
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription>
                      <Badge variant="secondary">{article.category}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                      {article.excerpt.slice(0, 100)}...
                    </p>
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="flex items-center text-xs text-gray-500">
                          <CalendarDays className="mr-1 h-3 w-3" />
                          {new Date(article.date).toLocaleDateString()}
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
        </div>
      </div>
    </div>
  );
}
