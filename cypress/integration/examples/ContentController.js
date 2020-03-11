require('dotenv').config()

describe('Content Controller', function() {
  
    it('Visits sparwelt.de/schnaeppchen', function() {

        cy.visit('https://www.sparwelt.de/gutscheine')
    })
    it('Check for search bar', function() {

        cy.get('header #search-navigation')
    })
    /*it('Check for top shops', function() {

        expect(cy.get('.section-wrapper-main-category .sub-categories')).to.have.length
    })*/
    it('Checks SEO validity', function() {
        cy.title().should('eq', 'Gutscheine & Gutscheincodes')
    })
})
