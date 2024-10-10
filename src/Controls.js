import React from 'react'
import Search from './search.js'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { Button } from '@mui/material'
import Select from '@mui/material/Select'
import * as Constants from './constants.js'
import Tutorial from './Tutorial.js'
import TextField from '@mui/material/TextField'
import ResultsGrid from './ResultsGrid.js'

function Controls() {
  const [name, setName] = React.useState('')
  const [length, setLength] = React.useState()
  const [results, setResults] = React.useState([])
  const [nativeRegion, setNativeRegion] = React.useState([])
  const [currentRegion, setCurrentRegion] = React.useState([])
  const [shape, setShape] = React.useState([])
  const [texture, setTexture] = React.useState([])
  const [showIntro, setShowIntro] = React.useState(true)
  const [hideFilters, setHideFilters] = React.useState(false)

  const resetFilters = () => {
    setName('')
    setLength('')
    setNativeRegion([])
    setCurrentRegion([])
    setShape([])
    setTexture([])
    setResults([])
    setHideFilters(false)
  }

  const handleSubmit = function (event) {
    event.preventDefault()

    console.log(length)
    let results = Search(name)
    setResults(results)
  }

  const handleDismissTutorial = (event) => {
    if (event) {
      setShowIntro(false)
    }
  }
  const handleShapeChange = (event) => {
    if (event) {
      setShape(event.target.value)
    }
  }

  const handleTextureChange = (event) => {
    if (event) {
      setTexture(event.target.value)
    }
  }

  const handleCurrentRegionChange = (event) => {
    if (event) {
      setCurrentRegion(event.target.value)
    }
  }

  const handleNativeRegionChange = (event) => {
    if (event) {
      setNativeRegion(event.target.value)
    }
  }

  const handleHideFilterClick = () => {
    setHideFilters(!hideFilters)
  }

  //search for:
  //Scientific Name (String to search for)
  //Geographic Range (Native) (dropdown)
  //Geographic Range (Current) (dropdown)
  //Seed length (float)
  return (
    <>
      {showIntro && <Tutorial handleDismissTutorial={handleDismissTutorial} />}
      {!showIntro && (
        <div className='search-fields'>
          <form onSubmit={handleSubmit}>
            <div className='container'>
              <Box className={hideFilters ? 'hidden' : ''} sx={{ m: 3, marginTop: '25px' }}>
                <div className='input-box'>
                  <TextField
                    sx={{ width: '500px' }}
                    id='outlined-basic'
                    label='Scientific Name'
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value)
                    }}
                  />
                </div>
                <div className='input-box'>
                  <TextField
                    sx={{ width: '500px' }}
                    id='outlined-controlled'
                    label='Seed length...'
                    name='length'
                    endAdornment='mm'
                    value={length}
                    onChange={(event) => {
                      setLength(event.target.value)
                    }}
                  />
                </div>
                <div className='input-box'>
                  <Box sx={{ minWidth: 120, marginBottom: '10px' }}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'>Native Geographic Region</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        multiple
                        placeholder='Native Geographic Region'
                        value={nativeRegion}
                        label='Native Geographic Region'
                        onChange={handleNativeRegionChange}
                      >
                        {Constants.regionOptions.map((item) => (
                          <MenuItem value={item} key={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div className='input-box'>
                  <Box sx={{ minWidth: 120, marginBottom: '10px' }}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'>Current Geographic Region</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        multiple
                        placeholder='Native Geographic Region'
                        value={currentRegion}
                        label='Native Geographic Region'
                        onChange={handleCurrentRegionChange}
                      >
                        {Constants.regionOptions.map((item) => (
                          <MenuItem value={item} key={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div className='input-box'>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'>Shape</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        multiple
                        placeholder='Seed Shape'
                        value={shape}
                        label='Seed Shape'
                        onChange={handleShapeChange}
                      >
                        {Constants.shapeOptions.map((item) => (
                          <MenuItem value={item} key={item}>
                            {item}

                            <img
                              loading='lazy'
                              width={50}
                              height={50}
                              srcSet={`images/dropdown/${item}`}
                              src={`images/dropdown/${item}`}
                              alt={`Image of ${item}`}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div className='input-box'>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'>Texture</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        multiple
                        placeholder='Seed Texture'
                        value={texture}
                        label='Seed Texture'
                        onChange={handleTextureChange}
                      >
                        {Constants.textureOptions.map((item) => (
                          <MenuItem value={item} key={item}>
                            {item}

                            <img
                              loading='lazy'
                              width={50}
                              height={50}
                              srcSet={`images/dropdown/${item}`}
                              src={`images/dropdown/${item}`}
                              alt={`Image of ${item}`}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </Box>
              <Box className='filter-buttons'>
                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: '#f50057',
                    width: '50px',
                    height: '50px'
                  }}
                  type='submit'
                >
                  Search
                </Button>
                <Button variant='text' sx={{ margin: '20px' }} onClick={resetFilters}>
                  Reset Filters
                </Button>

                <Button variant='text' sx={{ margin: '20px' }} onClick={handleHideFilterClick}>
                  {hideFilters ? 'Show Filters' : 'Hide Filters'}
                </Button>
              </Box>
            </div>
          </form>

          <ResultsGrid results={results} />
        </div>
      )}
    </>
  )
}

export default Controls
