describe('scroll cards', { viewportWidth: 430, viewportHeight: 932 }, () => {
  it('selects the first card on page load', () => {
    cy.visit('/')

    cy.get('#card-0').should('have.class', 'selected')
  })

  it('selects the topmost card when scrolling down the document', () => {
    cy.visit('/')

    cy.get('#card-40').then((card40) => {
      const card40YPosition = card40.position().top

      cy.scrollTo(0, card40YPosition, { duration: 500 })

      cy.get('#card-40').should('have.class', 'selected')
    })
  })

  it('does not select the topmost card when scrolling up the document', () => {
    cy.visit('/')

    cy.get('#card-60').then((card60) => {
      const card60YPosition = card60.position().top

      // Scroll down from card 0 to card 60
      cy.scrollTo(0, card60YPosition, { duration: 500 })

      cy.get('#card-30').then((card30) => {
        const card30YPosition = card30.position().top

        // Scroll up from card 60 to card 30
        cy.scrollTo(0, card30YPosition, { duration: 500 })

        cy.get('#card-30').should('not.have.class', 'selected')
      })
    })
  })
})
