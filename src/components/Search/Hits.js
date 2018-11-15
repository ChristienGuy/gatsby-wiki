import React from 'react'
import { Link } from 'gatsby'
import { connectHits } from 'react-instantsearch-dom'
import styled from 'styled-components'

const HitContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);
`

const Hit = styled(Link)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 16px;
`

const Hits = connectHits(({ hits }) => {
  return (
    <HitContainer>
      {hits.map(hit => (
        <Hit key={hit.objectID} to={hit.slug}>
          {hit.text}
          {/* <Highlight attribute="text" hit={hit} /> */}
        </Hit>
      ))}
    </HitContainer>
  )
})

export default Hits
