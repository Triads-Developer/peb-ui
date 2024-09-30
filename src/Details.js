import React from 'react'
import './App.css'
import { useParams, Link } from 'react-router-dom'
import data from './data/collection.json'

function Details() {
  const id = useParams()

  const accession = data.find((element) => (element.ID = id.id))

  console.log(accession)
  return (
    <>
      <p>Accession Details for Accession {id.id}!</p>
      <p>Genus {accession.Genus}!</p>
      <p>Species {accession.Species}!</p>
      <p>Botanical Author {accession['Botanical author']}!</p>
      <Link to='/'> Navigate back home </Link>
    </>
  )
}

export default Details
