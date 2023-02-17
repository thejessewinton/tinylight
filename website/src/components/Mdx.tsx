"use client";

import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";

import { clsx } from "clsx";
import Link from "next/link";

type ComponentProps = { className?: string };

const CustomLink = (props) => {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const components = {
  h1: ({ className, ...props }: ComponentProps) => (
    <h1
      className={clsx(
        "mt-2 font-serif text-4xl font-light lowercase italic",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentProps) => (
    <h2
      className={clsx(
        "mt-10 font-serif text-3xl font-light lowercase italic",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentProps) => (
    <h3
      className={clsx(
        "mt-8 font-serif text-2xl font-light lowercase italic",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: ComponentProps) => (
    <h4
      className={clsx(
        "mt-8 font-serif text-xl font-light lowercase italic",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: ComponentProps) => (
    <h5
      className={clsx(
        "mt-8 font-serif text-lg font-light lowercase italic",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: ComponentProps) => (
    <h6
      className={clsx(
        "mt-8 font-serif text-base font-light lowercase italic",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: ComponentProps) => (
    <CustomLink
      className={clsx(
        "border-b border-dotted border-neutral-200 font-medium",
        className
      )}
      {...props}
    />
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
  hr: ({ className, ...props }: ComponentProps) => (
    <hr
      className={clsx("my-8 border-dotted border-neutral-700", className)}
      {...props}
    />
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
};

interface MdxProps {
  code: string;
}

export const Mdx = ({ code }: MdxProps) => {
  const Component = useMDXComponent(code);

  return (
    <div className="space-y-8">
      <Component components={components} />
    </div>
  );
};
