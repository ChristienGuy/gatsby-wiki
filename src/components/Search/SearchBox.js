import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import styled from 'styled-components'

const SearchInput = styled.input`
  width: 100%;
  height: 3rem;
`

const SearchBox = connectSearchBox(
  ({ currentRefinement, refine, ...props }) => {
    const onChange = e => {
      refine(e.target.value)
      props.onChange(e)
    }

    const onBlur = e => {
      if (!currentRefinement) {
        props.onBlur(e)
      }
    }

    return (
      <SearchInput
        value={currentRefinement}
        onChange={onChange}
        onBlur={onBlur}
      />
    )
  }
)

export default SearchBox
