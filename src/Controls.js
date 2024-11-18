import React from 'react'
import Search from './search.js'

import Tutorial from './Tutorial.js'
import ResultsGrid from './ResultsGrid.js'
import SearchFields from './SearchFields.js'

function Controls() {
  const [showIntro, setShowIntro] = React.useState(true)
  const [results, setResults] = React.useState([])

  const handleSearch = function (name) {
    let results = Search(name)
    setResults(results)
  }

  const handleDismissTutorial = (event) => {
    if (event) {
      setShowIntro(false)
    }
  }

  const clearResults = () => {
    setResults([])
  }

  //search for:
  //Scientific Name (String to search for)
  //Geographic Range (Native) (dropdown)
  //Geographic Range (Current) (dropdown)
  //Seed length (float)
  return (
    <>
      <div className='App'>
        <header className='App-header'>
          {showIntro && <Tutorial handleDismissTutorial={handleDismissTutorial} />}
          {!showIntro && <SearchFields handleSearch={handleSearch} clearResults={clearResults} />}
          {!showIntro && <ResultsGrid results={results} />}
        </header>
      </div>
    </>
  )
}

export default Controls
