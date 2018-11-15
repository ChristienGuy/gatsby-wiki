// TODO: replace with path: `.env.${process.env.NODE_ENV}`, and setup environments
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const transformer = require('./build-utils/algoliaTransformer').transformer;


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
    transformer: transformer,
  },
]

module.exports = {
  siteMetadata: {
    title: 'Github Wiki',
  },
  plugins: [
    'gatsby-plugin-styled-components',
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
        plugins: [
          'gatsby-remark-autolink-headers'
        ],
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
