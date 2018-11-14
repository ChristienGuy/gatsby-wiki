// TODO: replace with path: `.env.${process.env.NODE_ENV}`, and setup environments
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const myQuery = `{
  allMarkdownRemark {
    edges {
      node {
        htmlAst
        fields {
          slug
          title
          date
        }
      }
    }
  }
}`



const queries = [
  {
    query: myQuery,
    transformer: ({ data }) => {
      const childrenAndSlugs = []

      const findTextChildren = ({ element, slug }) => {
        if(element.type === 'text' && element.value.trim() !== '') {
          childrenAndSlugs.push({
            text: element.value,
            slug: slug
          })
        }

        if (element.children != null) {
          element.children.forEach(child => findTextChildren({ element: child, slug }))
        }
      }

      data.allMarkdownRemark.edges.forEach(({ node }) => {
        findTextChildren({ element: node.htmlAst, slug: node.fields.slug })
      })

      return childrenAndSlugs;
    },
  },
]

module.exports = {
  siteMetadata: {
    title: 'Github Wiki',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `wiki-markdown`,
        path: `${__dirname}/github-wiki-markdown-converted`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: 'wiki', // for all queries
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
}
