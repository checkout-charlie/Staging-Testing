require('dotenv').config()

describe('Category Controller', function() {
  
    it('Visits sparwelt.de/kategorien', function() {

        cy.visit('https://www.sparwelt.de/kategorien')
    })
    it('Check for search bar', function() {

        cy.get('header #search-navigation')
    })
    it('Check for top shops', function() {

        cy.get('.section-wrapper-main-category .sub-categories').its('length').should('be.gte', 5)
    })
    it('Checks SEO validity', function() {
        cy.title().should('eq', 'Alle Sparmöglichkeiten nach Kategorien sortiert | SPARWELT')
        cy.get('head meta[name="description"]').should('have.attr', 'content','Gutscheine, Schnäppchen und Gratisproben für alle Online-Shops sortiert nach Kategorie')
        cy.contains('Alle Kategorien im Überblick')
    })
    it('Visits sparwelt.de/schnaeppchen', function() {

        cy.visit('https://www.sparwelt.de/kategorien/tarife')
    })
    it('Checks SEO validity', function() {
        cy.title().should('eq', 'Tarife | SPARWELT')
        cy.get('head meta[name="description"]').should('have.attr', 'content','Kaufe alles bei')
        cy.get('head meta[name="robots"]').should('index, follow')
        cy.contains('Tarife')
    })
    

})
