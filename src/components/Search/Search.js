import React, { Component } from 'react'
import { InstantSearch } from 'react-instantsearch-dom'

import SearchBox from './SearchBox'
import Hits from './Hits'

class Search extends Component {
  state = {
    isOpen: false,
  }

  onChange = () => {
    const { isOpen } = this.state
    if (!isOpen) {
      this.setState({
        isOpen: true,
      })
    }
  }

  closeSearch = () => {
    this.setState({
      isOpen: false,
    })
  }

  render() {
    const { isOpen } = this.state
    return (
      <InstantSearch
        appId="87LKGEN3VX"
        apiKey="7b041767c58420f10181a0f430957c06"
        indexName="wiki"
      >
        <SearchBox onChange={this.onChange} onBlur={this.closeSearch} />
        {isOpen ? <Hits /> : null}
      </InstantSearch>
    )
  }
}

export default Search
