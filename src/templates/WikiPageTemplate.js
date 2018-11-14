import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout'

const WikiPageTemplate = ({ data }) => {
  const { markdownRemark } = data;
  const { fields, html } = markdownRemark;

  return (
    <Layout>
      <h1>{fields.title}</h1>
      <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html,
      fields {
        title
      }
    }
  }
`

export default WikiPageTemplate;