import algoliasearch from "algoliasearch";

const algolia = algoliasearch('3L5U17U9IT', 'dec13d89bd06e6da506501276f5999c1');
export const bookmarksIndex = algolia.initIndex('bookmarks');