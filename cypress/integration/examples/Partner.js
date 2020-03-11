require('dotenv').config()

describe('Partner functionality', function() {
	
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

    it('edits a voucher', function() {
		
		cy.visit('https://staging.sparwelt.de/admin/econa/syndication/partnervoucher/list',{
            auth: {
                username: admin,
                password: admin_password
            }
        })

		cy.get(':nth-child(1) > :nth-child(2) > .sonata-link-identifier').click()
		cy.get('.form-control').eq(0).type(rand, {force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.get('.alert').contains('wurde erfolgreich bearbeitet.')
		cy.contains(rand)
	})	
	
	it('creates and edits a partner', function() {
		cy.visit('https://staging.sparwelt.de/admin/econa/syndication/partner/create',{
            auth: {
                username: admin,
                password: admin_password
            }
        })


		cy.get('.form-control').eq(0).type(partner, {force: true})
		cy.get('.form-control').eq(1).type(partner, {force: true})
		cy.get('#mceu_49-open > .mce-txt').click({force: true})
		cy.get('#mceu_69').click({force: true})
		cy.get('#mceu_72').type(partner, {force: true})
		cy.get('#mceu_74 > button').click({force: true})
		cy.get('[name="btn_create_and_list"]').click()

		cy.get('.sonata-link-identifier').contains(partner).click()
		cy.get('.form-control').eq(0).type(' + Edit', {force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.get('.alert').contains('wurde erfolgreich bearbeitet.')
		cy.contains('Edit')
	})
	it('edits Anbieter', function() {
		cy.visit('https://staging.sparwelt.de/admin/econa/syndication/partnershoppingshop/list',{
            auth: {
                username: admin,
                password: admin_password
            }
        })

			cy.get(':nth-child(1) > :nth-child(2) > .sonata-link-identifier').click()
		cy.get('#mceu_116').click({force: true})
		cy.get('#mceu_135').click({force: true})
		cy.get('#mceu_138').type('Langbeschreibung' + rand, {force: true})
		cy.get('#mceu_140 > button').click({force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.get('.alert').contains('wurde erfolgreich bearbeitet.')
		cy.contains(rand)
	})
	it('edits Partner Listings Widget', function() {


		cy.visit('https://staging.sparwelt.de/admin/econa/syndication/partnerlisting/29/edit?partner=297',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
		cy.get('.sonata-ba-field').eq(7).within(() => {
			cy.get('.form-control').eq(2).children().its('length').then((num) => {
				cy.get('.form-control').eq(1).children().first().dblclick({force: true})
				cy.get('.form-control').eq(2).children().should('have.length', num+1)

			})
		})
		
		cy.get('.sonata-ba-field').eq(8).within(() => {
			cy.get('.form-control').eq(2).children().its('length').then((num) => {
				cy.get('.form-control').eq(1).children().first().dblclick({force: true})
				cy.get('.form-control').eq(2).children().should('have.length', num+1)

			})
		})

		cy.get('[name="btn_update_and_edit"]').click()
		cy.get('.alert').contains('wurde erfolgreich bearbeitet.')
	})
	
})
