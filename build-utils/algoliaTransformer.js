const transformer = ({ data }) => {
  const childrenAndSlugs = [];
  const hTags = ["h1", "h2", "h3", "h4", "h5", "h6"];
  let hTagSlug;

  const findTextChildren = ({ element, slug }) => {
    const { value, properties, tagName } = element;

    if (hTags.includes(tagName)) {
      hTagSlug = `${slug}#${properties.id}`;
    }

    if (element.type === "text" && element.value.trim() !== "") {
      childrenAndSlugs.push({
        text: value,
        slug: hTagSlug || slug
      });
    }

    if (element.children != null) {
      element.children.forEach(child =>
        findTextChildren({ element: child, slug })
      );
    }
  };

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    findTextChildren({ element: node.htmlAst, slug: node.fields.slug });
  });

  return childrenAndSlugs;
};

module.exports = {
  transformer
}