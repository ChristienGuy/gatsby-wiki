import React from 'react'
import { graphql } from 'gatsby'
import Search from '../components/Search'

import Layout from '../components/layout'

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Search />
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
