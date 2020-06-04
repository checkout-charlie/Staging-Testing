require('dotenv').config()

describe('Redationsempfehlungen functionality', function() {
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

    it('Empfehlungen', function() {
		
		cy.get('.sidebar-menu > :nth-child(4) > [href="#"]').click()
        cy.get('.treeview.active > .active > :nth-child(6) > a').click()
		cy.get('.sonata-link-identifier').click()

	})
})
