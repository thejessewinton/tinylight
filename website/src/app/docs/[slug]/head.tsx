import { allDocs } from "contentlayer/generated";

interface DocPageProps {
  params: {
    slug: string;
  };
}

export default function Head({ params }: DocPageProps) {
  const slug = params?.slug || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);
  return (
    <>
      <title>{`${doc?.title} — Documentation`}</title>
      <meta name="description" content={doc?.description} />
    </>
  );
}
