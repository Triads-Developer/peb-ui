import React from 'react'
import './App.css'
import { DataGridPro, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid-pro'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import Zoom from 'react-medium-image-zoom'
import './Zoom.css'

// API configuration
const API_BASE_URL =
  process.env.NODE_ENV === 'production' ? 'http://paleoethnobotany.research-stage.artsci.wustl.edu:3001' : 'http://localhost:3001'

function ResultsGrid({ results, handleDetailsClick }) {
  const columns = [
    { field: 'GDCC_ID', headerName: 'Accession Number', width: 150 },
    { field: 'Family', headerName: 'Family', width: 250 },
    { field: 'Genus', headerName: 'Genus', width: 250 },
    { field: 'Species', headerName: 'Species', width: 200 },
    { field: 'Botanical Author', headerName: 'Botanical Author', width: 125 },
    { field: 'Common Name', headerName: 'Common Name', width: 125 },
    {
      field: 'image',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => (
        <Zoom>
          <img
            className='img-icon'
            src={`${API_BASE_URL}/images/icons/${params.row.GDCC_ID}`}
            alt={`${params.row.Genus} ${params.row.Species}`}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = `${API_BASE_URL}/images/icons/default`
            }}
          />
        </Zoom>
      )
    },
    {
      field: 'Details',
      headerName: 'Details',
      width: 200,
      renderCell: (params) => (
        <button id={params.row.GDCC_ID} onClick={handleDetailsClick}>
          Details
        </button>
      )
    }
  ]

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    )
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {results && results.length > 0 ? (
          <>
            <DataGridPro
              sx={{ width: '100%' }}
              rows={results}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 20 } }
              }}
              pagination
              rowHeight={125}
              pageSizeOptions={[5, 10, 20]}
              disableColumnFilter
              headerFilters
              slots={{
                toolbar: CustomToolbar
              }}
            />
          </>
        ) : null}
      </Box>
    </>
  )
}

ResultsGrid.propTypes = {
  results: PropTypes.array,
  handleDetailsClick: PropTypes.func
}

export default ResultsGrid
