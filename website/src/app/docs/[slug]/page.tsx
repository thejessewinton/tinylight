import { Mdx } from "@/components/Mdx";
import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";

interface DocPageProps {
  params: {
    slug: string;
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const slug = params?.slug || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    notFound();
  }

  return (
    <>
      <div className="mx-auto w-full min-w-0">
        <Mdx code={doc.body.code} />
      </div>
      <div className="hidden text-sm xl:block"></div>
    </>
  );
}
