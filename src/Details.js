import { React, useState, useEffect } from 'react'
import Zoom from 'react-medium-image-zoom'
import Box from '@mui/material/Box'
import DetailsSection from './DetailsSection.js'
import PropTypes from 'prop-types'
import collection from './data/collection.json'

import './App.css'
import './Zoom.css'

// API configuration
const API_BASE_URL =
  process.env.NODE_ENV === 'production' ? 'http://paleoethnobotany.research-stage.artsci.wustl.edu:3001' : 'http://localhost:3001'

function Details({ accessionId, handleReturnClick }) {
  const [images, setImages] = useState([])
  const [accession, setAccession] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    // Find accession details
    const accessionData = collection.find((element) => element.GDCC_ID === accessionId)
    setAccession(accessionData || {})

    // Fetch images
    fetch(`${API_BASE_URL}/images/${accessionId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch images')
        }
        return response.json()
      })
      .then((data) => setImages(data))
      .catch((err) => {
        console.error('Error fetching images:', err)
        setError('Failed to load images')
      })
      .finally(() => setLoading(false))
  }, [accessionId])

  return (
    <Box className='details-section-box'>
      <Box className='content-box' sx={{ mx: 10, textAlign: 'left' }}>
        <Box className='image-box'>
          {loading ? (
            <p>Loading images...</p>
          ) : error ? (
            <p>{error}</p>
          ) : images.length === 0 ? (
            <p>No images available</p>
          ) : (
            images.map((image) => (
              <Zoom key={image}>
                <img
                  className='img-icon'
                  src={`${API_BASE_URL}/images/${accessionId}/${image}`}
                  alt={`${accession.Genus || ''} ${accession.Species || ''} - ${image}`}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = `${API_BASE_URL}/images/icons/default`
                  }}
                />
              </Zoom>
            ))
          )}
        </Box>
        <Box className='info-box'>
          <DetailsSection title='ID' details={accessionId} />
          <DetailsSection title='Common Name' details={accession['Common name']} />
          <DetailsSection title='Family' details={accession.Family} />
          <DetailsSection title='Genus' details={accession.Genus} />
          <DetailsSection title='Species' details={accession.Species} />
          <DetailsSection title='Type of material' details={accession['Type of material']} />
          <DetailsSection title='Seed length (mm)' details={accession['Seed length (mm)']} />
          <DetailsSection title='Seed shape' details={accession['Seed shape']} />
          <DetailsSection title='Surface texture' details={accession['Surface texture']} />

          <Box>
            <p>Botanical Author: {accession['Botanical author']}</p>
          </Box>
        </Box>
      </Box>
      <button onClick={handleReturnClick}>Return to Search</button>
    </Box>
  )
}

Details.propTypes = {
  accessionId: PropTypes.string,
  handleReturnClick: PropTypes.func
}

export default Details
