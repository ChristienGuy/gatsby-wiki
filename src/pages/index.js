import React from 'react'
import Helmet from 'react-helmet'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
} from 'react-instantsearch-dom'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

const Result = ({ hit }) => (
  <Link to={hit.slug}>
    <Highlight attribute="text" hit={hit} />
  </Link>
)
const Search = () => (
  <div className="container">
    <SearchBox />
    <Hits hitComponent={Result} />
  </div>
)
const IndexPage = ({ data }) => {
  const {
    allMarkdownRemark: { edges },
  } = data
  return (
    <Layout>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/algolia-min.css"
        />
      </Helmet>
      <InstantSearch
        appId="87LKGEN3VX"
        apiKey="7b041767c58420f10181a0f430957c06"
        indexName="wiki"
      >
        <Search />
      </InstantSearch>
      {/* <ul>
        {edges.map(({ node }) => (
          <li key={node.fields.path}>
            <Link to={node.fields.path}>{node.fields.title}</Link>
          </li>
        ))}
      </ul> */}
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
            title
            date
          }
        }
      }
    }
  }
`

export default IndexPage
