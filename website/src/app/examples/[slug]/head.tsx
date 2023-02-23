import { allDocs } from "contentlayer/generated";

interface DocPageProps {
  params: {
    slug: string;
  };
}

const Head = ({ params }: DocPageProps) => {
  const slug = params?.slug || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    return (
      <>
        <title>Documentation</title>
      </>
    );
  }

  return (
    <>
      <title>{`${doc.title} — Documentation`}</title>
      <meta name="description" content={doc.description} />
    </>
  );
};

export default Head;
