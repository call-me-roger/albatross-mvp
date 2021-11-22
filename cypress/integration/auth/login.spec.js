context('Renders OnBoard Page', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('Creates a new wallet', () => {
    cy.get('[data-cy=createWalletBtn]').click()
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/slide/1')
    })

    cy.get('[data-cy=slide3btn]').click()
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/slide/2')
    })

    cy.get('[data-cy=slide4btn]').click()
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/slide/3')
    })

    cy.get('[data-cy=slide5btn]').click()
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/slide/4')
    })
    cy.get('[data-cy=seedbtn]').should('be.disabled')
    cy.get('[data-cy=checkbox1]').check()
    cy.get('[data-cy=checkbox2]').check()
    cy.get('[data-cy=seedbtn]').should('not.disabled')
    cy.get('[data-cy=seedbtn]').click()
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/seed')
    })

    cy.get('[data-cy=seed-box]')
      .invoke('text')
      .then(text => {
        const seed = text.split(' ')
        expect(seed).to.have.length(12)

        cy.get('[data-cy=inform-seed-btn]').click()
        cy.location().should(loc => {
          expect(loc.pathname).to.eq('/seed/inform')
        })

        seed.forEach(text => {
          cy.get(`[data-cy=seed-word-${text}]`).click()
        })
        cy.get('[data-cy=create-password-btn]').click()

        cy.location().should(loc => {
          expect(loc.pathname).to.eq('/signup')
        })
        cy.get('[data-cy=create-wallet-btn]').should('be.disabled')
        cy.get('[data-cy=password-input]').type('12345678')
        cy.get('[data-cy=check-password-input]').type('12345678')
        cy.get('[data-cy=create-wallet-btn]').should('not.disabled')
        cy.get('[data-cy=create-wallet-btn]').click()
        cy.location().should(loc => {
          expect(loc.pathname).to.eq('/')
        })
      })
  })
})
