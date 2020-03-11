require('dotenv').config()

describe('Feauture functionality', function() {
    const admin = Cypress.env('admin')
    const admin_password = Cypress.env('admin_password')
    const user = Cypress.env('user')
    const user_password = Cypress.env('user_password')
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

    it('Features', function() {
		
		cy.get('.last.treeview > [href="#"]').click()
		cy.get('.treeview.active > .active > .first > a').click()

	})
})
