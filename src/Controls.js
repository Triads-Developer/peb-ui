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
  const [selectedAccessionId, setSelectedAccessionId] = React.useState(0)

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
    setSelectedAccessionId(event.currentTarget.id)
    setShowDetails(!showDetails)
    console.log('id from COntrols ' + typeof(selectedAccessionId))
  }

  const handleReturnClick = () => {
    setShowDetails(!showDetails)
    console.log(selectedAccessionId)
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
          {!showIntro && (
            <>
              {!showDetails && <SearchFields handleSearch={handleSearch} clearResults={clearResults} />}
              {!showDetails && <ResultsGrid results={results} handleDetailsClick={handleDetailsClick} />}
              {showDetails && <Details accesssionId={selectedAccessionId} handleReturnClick={handleReturnClick} />}
            </>
          )}
        </header>
      </div>
    </>
  )
}

export default Controls
