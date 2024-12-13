import { React, useState, useEffect } from 'react'
import Zoom from 'react-medium-image-zoom'
import Box from '@mui/material/Box'
import DetailsSection from './DetailsSection.js'
import PropTypes from 'prop-types'
import collection from './data/collection.json'

import './App.css'
import './Zoom.css'

function Details({ accessionId, handleReturnClick }) {
  const [images, setImages] = useState([])
  const [accession, setAccession] = useState({})

  useEffect(() => {
    fetch('/images/' + accessionId)
      .then((response) => response.json())
      .then((data) => setImages(data))

    setAccession(collection.find((element) => element.GDCC_ID == accessionId))
  }, [accessionId, accession])

  return (
    <Box sx={{ mx: 10 }}>
      <DetailsSection title='Accession Details' details='Accession Details for Accession' />
      <DetailsSection title='Genus' details={accession.Genus} />
      <DetailsSection title='Species' details={accession.Species} />

      <Box>
        <p>Botanical Author: {accession['Botanical author']}</p>
      </Box>

      <DetailsSection title='Images' details='Images'>
        {images.map((image) => (
          <Zoom key={image}>
            <img className='img-icon' src={'/images/' + accessionId + '/' + image} />{' '}
          </Zoom>
        ))}
      </DetailsSection>

      <Box>
        <button onClick={handleReturnClick}>Return to Search</button>
      </Box>
    </Box>
  )
}

Details.propTypes = {
  accessionId: PropTypes.string,
  handleReturnClick: PropTypes.func
}

export default Details
