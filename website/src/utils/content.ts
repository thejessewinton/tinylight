import { type Index, allIndices } from 'contentlayer/generated'

export const getIndex = () => {
  return allIndices.find((doc) => doc.slug === '/') as Index
}
