import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'

function Tutorial({ handleDismissTutorial }) {
  return (
    <>
      <div className='App'>
        <header className='App-header'>
          <div className='tutorial-box'>
            <p>Welcome to Washu&apos;s Paleoethnobotany database </p>
            <p>This site will help you identify a seed that you may have found</p>
            <Button variant='text' id='tutorial-button' onClick={handleDismissTutorial}>
              Begin searching!
            </Button>
          </div>
        </header>
      </div>
    </>
  )
}

Tutorial.propTypes = {
  handleDismissTutorial: PropTypes.func
}

export default Tutorial
