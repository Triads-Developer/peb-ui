import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import './App.css'

function DetailsSection({ title, details, children }) {
  return (
    <Box>
      <h1>{title}</h1>
      <p>{details}</p>
      <p>{children}</p>
    </Box>
  )
}

DetailsSection.propTypes = {
  title: PropTypes.string,
  details: PropTypes.string,
  children: PropTypes.node
}

export default DetailsSection
