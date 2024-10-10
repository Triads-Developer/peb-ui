import React from 'react'
import './App.css'
import { DataGridPro, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid-pro'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import * as Constants from './constants.js'
import { Link } from 'react-router-dom'

function ResultsGrid({ results }) {
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
              rows={results}
              columns={Constants.columns}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 20 } }
              }}
              pagination
              pageSizeOptions={[5, 10, 20]}
              autoHeight
              disableColumnFilter
              headerFilters
              slots={{
                toolbar: CustomToolbar
              }}
            />
            <Link to='/'>Back to Home </Link>
          </>
        ) : null}
      </Box>
    </>
  )
}

ResultsGrid.propTypes = {
  results: PropTypes.array
}

export default ResultsGrid
