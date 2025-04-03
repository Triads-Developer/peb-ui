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

  // Form state
  const [name, setName] = React.useState('')
  const [length, setLength] = React.useState('')
  const [nativeRegion, setNativeRegion] = React.useState([])
  const [currentRegion, setCurrentRegion] = React.useState([])
  const [shape, setShape] = React.useState([])
  const [texture, setTexture] = React.useState([])
  const [hideFilters, setHideFilters] = React.useState(false)

  const handleSearch = function (searchName) {
    let results = Search(searchName)
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
  }

  const handleReturnClick = () => {
    setShowDetails(!showDetails)
  }

  const clearResults = () => {
    setResults([])
    setName('')
    setLength('')
    setNativeRegion([])
    setCurrentRegion([])
    setShape([])
    setTexture([])
    setHideFilters(false)
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
              {!showDetails && (
                <SearchFields
                  handleSearch={handleSearch}
                  clearResults={clearResults}
                  // Form state
                  name={name}
                  setName={setName}
                  length={length}
                  setLength={setLength}
                  nativeRegion={nativeRegion}
                  setNativeRegion={setNativeRegion}
                  currentRegion={currentRegion}
                  setCurrentRegion={setCurrentRegion}
                  shape={shape}
                  setShape={setShape}
                  texture={texture}
                  setTexture={setTexture}
                  hideFilters={hideFilters}
                  setHideFilters={setHideFilters}
                />
              )}
              {!showDetails && <ResultsGrid results={results} handleDetailsClick={handleDetailsClick} />}
              {showDetails && <Details accessionId={selectedAccessionId} handleReturnClick={handleReturnClick} />}
            </>
          )}
        </header>
      </div>
    </>
  )
}

export default Controls
