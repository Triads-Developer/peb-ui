import { React, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import data from './data/collection.json'
import Zoom from 'react-medium-image-zoom'
import Box from '@mui/material/Box'
import './App.css'
import './Zoom.css'

function Details() {
  const [images, setImages] = useState([])

  const id = useParams()

  const accession = data.find((element) => (element.ID = id.id))

  console.log(id.id)

  useEffect(() => {
    fetch('/images/' + id.id)
      .then((response) => response.json())
      .then((data) => setImages(data))
  }, [id])

  console.log(images)

  return (
    <Box sx={{ mx: 10 }}>
      <Box>
        <h1>Accession Details for Accession {id.id}!</h1>
      </Box>

      <Box>
        <h1>Number of images {images.length}!</h1>
      </Box>
      <Box>
        <p>Genus: {accession.Genus}</p>
      </Box>
      <Box>
        <p>Species: {accession.Species}</p>
      </Box>
      <Box>
        <p>Botanical Author: {accession['Botanical author']}</p>
      </Box>
      <Box>
        <span> Images </span>
        {images.map((image) => (
          <Zoom key={image}>
            <img className='img-icon' src={'/images/' + id.id + '/' + image} />{' '}
          </Zoom>
        ))}
      </Box>
      <Box>
        <Link to='/'> Navigate back home </Link>
      </Box>
    </Box>
  )
}

export default Details
