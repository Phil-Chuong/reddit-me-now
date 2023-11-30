import React from 'react'
import Posts from './Posts'

describe('<Posts />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Posts />)
  })
})