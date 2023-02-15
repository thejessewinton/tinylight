export default function Head() {
  const seo = {
    title: "tinylight",
    description:
      "🎉 A set of small, unopinionated component primitives for building lightbox components in React.",
    image: `${process.env.NEXT_PUBLIC_URL}/og.jpg`,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="🎉 A set of small, unopinionated component primitives for building lightbox components in React."
      />
      <link rel="icon" href="/favicon.ico" />
      <meta property="twitter:title" content={seo.title} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.image} />
      <meta property="og:site_name" content="Ryan Spacone" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={seo.image} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content={seo.image} />
      <meta name="description" content={seo.description} />
      <meta property="twitter:description" content={seo.description} />
      <meta property="og:description" content={seo.description} />
    </>
  );
}
