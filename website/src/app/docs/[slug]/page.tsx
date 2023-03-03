import { Mdx } from "@/components/Mdx";
import { allDocs, type Doc } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface DocPageProps {
  params: {
    slug: string;
  };
}

export const generateMetadata = ({ params }: DocPageProps): Metadata => {
  const doc = allDocs.find((doc) => doc.slugAsParams === params.slug) as Doc;

  return {
    title: doc.title,
    description: doc.description,
  };
};

const DocPage = ({ params }: DocPageProps) => {
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
    </>
  );
};

export default DocPage;
