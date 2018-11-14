/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const wikiPostTemplate = path.resolve(`src/templates/WikiPageTemplate.js`)

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            parent {
              ... on File {
                name
                sourceInstanceName
              }
            }
            fields {
              slug
              title
              date
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: wikiPostTemplate,
        context: {
          id: node.id,
        }, // additional data can be passed via context
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const parent = getNode(node.parent)

    createNodeField({
      name: 'slug',
      node,
      value:
        node.frontmatter.path || parent.relativePath.replace(parent.ext, ''),
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title || parent.name,
    })

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date || parent.modifiedTime,
    })
  }
}
