

describe('Reddit Me Now App', () => {
  it('should load the app and perform basic actions', () => {
   
    cy.visit('http://localhost:3000'); 

    cy.get('.subreddit-container').should('exist');
    
    cy.get('.subreddit-button').first().click();
    
    cy.get('.post-container').should('exist');

  });
});
