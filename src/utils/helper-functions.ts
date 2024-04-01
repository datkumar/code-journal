export const containsAllTags = (
  entryTags: string[],
  queryTags: string[]
): boolean => {
  // Check if any tag in query is present in entry
  return queryTags.every((tag) => entryTags.includes(tag));
};

export const containsSomeTag = (
  entryTags: string[],
  queryTags: string[]
): boolean => {
  // Check if at least one tag in query is present in entry
  return queryTags.some((tag) => entryTags.includes(tag));
};
