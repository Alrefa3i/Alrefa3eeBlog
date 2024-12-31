import Loading from "~/components/ui/loading";
import { Suspense } from "react";
import GetAllTags from "./content";
export default async function Page() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <GetAllTags />
      </Suspense>
    </>
  );
}
