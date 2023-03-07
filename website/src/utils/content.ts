import { allIndices, type Index } from "contentlayer/generated";

export const getIndex = () => {
  return allIndices.find((doc) => doc.slug === "/") as Index;
};
