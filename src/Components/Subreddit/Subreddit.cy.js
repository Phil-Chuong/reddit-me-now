import React from 'react'
import Subreddit from './Subreddit'

describe('<Subreddit />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Subreddit />)
  })
})