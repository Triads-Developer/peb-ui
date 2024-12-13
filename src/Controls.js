import React from 'react'
import Search from './search.js'
import Tutorial from './Tutorial.js'
import ResultsGrid from './ResultsGrid.js'
import SearchFields from './SearchFields.js'
import Details from './Details.js'

function Controls() {
  const [showIntro, setShowIntro] = React.useState(true)
  const [results, setResults] = React.useState([])
  const [showDetails, setShowDetails] = React.useState(false)
  const [selectedAccession, setSelectedAccession] = React.useState(0)

  const handleSearch = function (name) {
    let results = Search(name)
    setResults(results)
  }

  const handleDismissTutorial = (event) => {
    if (event) {
      setShowIntro(false)
    }
  }

  const handleDetailsClick = (event) => {
    if (showDetails) {
      setShowDetails(false)
    } else {
      setShowDetails(true)
    }

    console.log(showDetails)
    setSelectedAccession(event.currentTarget.id)
    console.log(event.currentTarget.id)
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
          {!showIntro && !showDetails && <SearchFields handleSearch={handleSearch} clearResults={clearResults} />}
          {!showIntro && !showDetails && <ResultsGrid results={results} handleDetailsClick={handleDetailsClick} />}
          {!showIntro && showDetails && <Details accesssionId={selectedAccession} handleReturnClick={handleDetailsClick} />}
        </header>
      </div>
    </>
  )
}

export default Controls
