require('dotenv').config()
Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false
  })

describe('Partner functionality continued', function() {
	let rand = Math.floor(Math.random() * 100)
	let partner = "Testpartner " + rand
    const admin = Cypress.env('ADMIN')
    const admin_password = Cypress.env('ADMIN_PASSWORD')
    const user = Cypress.env('USER')
    const user_password = Cypress.env('USER_PASSWORD')
	beforeEach(function() {
		cy.visit('https://staging.sparwelt.de/admin/login',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
        cy.get('input#username.form-control').type(user)
        cy.get('input#password.form-control').type(user_password)
        cy.contains('Sign In').click()

	})

    it('edits Partner Listings Top Shops', function() {
            
        
        cy.visit('https://staging.sparwelt.de/admin/econa/syndication/partnerlisting/30/edit?partner=297',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
        cy.get('.sonata-ba-field').eq(7).within(() => {
            cy.get('.form-control').eq(1).children().its('length').then((num) => {
                cy.get('.form-control').eq(1).children().first().dblclick({force: true})
                cy.get('.form-control').eq(1).children().should('have.length', num-1)

            })
        })
        
        cy.get('.sonata-ba-field').eq(8).within(() => {
            cy.get('.form-control').eq(1).children().its('length').then((num) => {
                cy.get('.form-control').eq(1).children().first().dblclick({force: true})
                cy.get('.form-control').eq(1).children().should('have.length', num-1)

            })
        })

        cy.get('[name="btn_update_and_edit"]').click()
        cy.get('.alert').contains('wurde erfolgreich bearbeitet.')
    })

    it('edits a Partner Slider', function() {

        cy.visit('https://staging.sparwelt.de/admin/econa/syndication/slider/22301/edit?partner=299',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
        cy.get('.icon-plus').click({force: true})
        cy.get('.modal-body').within(() => {
            cy.get('.select2-chosen').eq(1).click({force: true})
        })
        cy.get('.select2-result-label').eq(1).click({force: true})	
        cy.get('.modal-body').within(() => {
            cy.get('.form-control').eq(2).type('auto Slider Item' + rand, {force: true})

            
            cy.get('.btn').eq(1).click({force: true})
        })
        cy.contains('auto Slider Item' + rand)
    })

    it('edits a Promotion Card', function() {
        cy.visit('https://staging.sparwelt.de/admin/econa/syndication/slider/22302/edit?partner=299',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
        cy.get('.icon-plus').click({force: true})
        cy.get('.modal-body').within(() => {
            cy.get('.select2-chosen').eq(1).click({force: true})
        })
        cy.get('.select2-result-label').eq(1).click({force: true})	
        cy.get('.modal-body').within(() => {
            cy.get('.form-control').eq(2).type('auto promotion card' + rand, {force: true})

            
            cy.get('.btn').eq(1).click({force: true})

        })
        cy.contains('auto promotion card' + rand)
    })

})
