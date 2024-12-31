import { Suspense } from "react";
import HomeClient from "./HomeClient";
import Loading from "~/components/ui/loading";

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <HomeClient />
      </Suspense>
    </>
  );
}
