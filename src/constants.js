import React from 'react'
import { Link } from 'react-router-dom'

export const shapeOptions = ['ellipsoidal', 'fusiform', 'globose', 'ovoid']

export const textureOptions = ['smooth', 'rough', 'slimy']

export const regionOptions = ['Canada', 'North America', 'Africa', 'Europe']

export const columns = [
  { field: 'GDCC_ID', headerName: 'Accession Number', width: 10 },
  { field: 'Family', headerName: 'Family', width: 125 },
  { field: 'Genus', headerName: 'Genus', width: 125 },
  { field: 'Species', headerName: 'Species', width: 125 },
  { field: 'Botanical Author', headerName: 'Botanical Author', width: 125 },
  { field: 'Common Name', headerName: 'Common Name', width: 125 },
  { field: 'image', headerName: 'Image', width: 200, renderCell: (params) => <img src={'images/icons/' + params.row.GDCC_ID} /> },
  {
    field: 'Details',
    headerName: 'Details',
    width: 200,
    renderCell: (params) => <Link to={'/details/' + params.row.GDCC_ID}> Details {params.row.ID} </Link>
  }
]
