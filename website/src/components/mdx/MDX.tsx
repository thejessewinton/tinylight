"use client";

import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";

import { clsx } from "clsx";

type ComponentProps = { className?: string };

const headingClasses = "font-medium mb-2";

const components = {
  h1: ({ className, ...props }: ComponentProps) => (
    <h1 className={clsx(headingClasses, className)} {...props} />
  ),
  h2: ({ className, ...props }: ComponentProps) => (
    <h2 className={clsx(headingClasses, className)} {...props} />
  ),
  h3: ({ className, ...props }: ComponentProps) => (
    <h3 className={clsx(headingClasses, className)} {...props} />
  ),
  h4: ({ className, ...props }: ComponentProps) => (
    <h4 className={clsx(headingClasses, className)} {...props} />
  ),
  h5: ({ className, ...props }: ComponentProps) => (
    <h5 className={clsx(headingClasses, className)} {...props} />
  ),
  h6: ({ className, ...props }: ComponentProps) => (
    <h6 className={clsx(headingClasses, className)} {...props} />
  ),
  a: ({ className, ...props }: ComponentProps) => (
    <a className={clsx("font-medium", className)} {...props} />
  ),
  p: ({ className, ...props }: ComponentProps) => (
    <p className={clsx("leading-7", className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentProps) => (
    <ul className={clsx("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentProps) => (
    <ol className={clsx("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentProps) => (
    <li className={clsx("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentProps) => (
    <blockquote
      className={clsx(
        "mt-6 border-l border-dotted border-l-neutral-700 pl-6 text-sm text-neutral-200 [&>*]:text-neutral-300",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentProps) => (
    <pre
      className={clsx(
        "mt-6 mb-4 overflow-x-auto rounded-md bg-neutral-800 p-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentProps) => <code {...props} />,
  Image,
  Lightbox,
};

interface MDXProps {
  code: string;
}

export const MDX = ({ code }: MDXProps) => {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
};
