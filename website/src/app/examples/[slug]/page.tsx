import { allExamples, type Examples } from "contentlayer/generated";
import { type Metadata } from "next";
import { Mdx } from "@/components/Mdx";
import { Example } from "@/components/Example";

interface ExamplesPageProps {
  params: {
    slug: string;
  };
}

export const generateMetadata = ({ params }: ExamplesPageProps): Metadata => {
  const doc = allExamples.find(
    (doc) => doc.slugAsParams === params.slug
  ) as Examples;

  return {
    title: doc.title,
    description: doc.description,
  };
};

const ExamplesPage = ({ params }: ExamplesPageProps) => {
  const slug = params?.slug || "";
  const doc = allExamples.find((doc) => doc.slugAsParams === slug) as Examples;

  return (
    <>
      <Mdx code={doc.body.code} />
      <Example />
    </>
  );
};

export default ExamplesPage;
