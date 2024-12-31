import Loading from "~/components/ui/loading";
import { Suspense } from "react";

import Tag from "./tag";

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Tag tag={tag} />
      </Suspense>
    </>
  );
}
