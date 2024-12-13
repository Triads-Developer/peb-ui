import React from 'react'
import './App.css'
import { DataGridPro, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid-pro'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import Zoom from 'react-medium-image-zoom'
import './Zoom.css'

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
          {' '}
          <img className='img-icon' src={'images/icons/' + params.row.GDCC_ID} />{' '}
        </Zoom>
      )
    },
    {
      field: 'Details',
      headerName: 'Details',
      width: 200,
      renderCell: (params) => (
        <button id={params.row.GDCC_ID} onClick={handleDetailsClick}>
          {' '}
          Details{' '}
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
        {results.length > 0 ? (
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
