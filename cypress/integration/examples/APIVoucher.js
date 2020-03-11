require('dotenv').config()

describe('API voucher functionality', function() {
	let rand = Math.floor(Math.random() * 100)
	const admin = Cypress.env('admin')
    const admin_password = Cypress.env('admin_password')
    const user_password = Cypress.env('user')
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

    it('creates a new API voucher', function() {
		
		
		/*API Voucher*/
        cy.visit('https://staging.sparwelt.de/admin/econa/offer/voucherbyapi/list',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
		cy.get(':nth-child(1) > .sonata-ba-list-field-text > .sonata-link-identifier').click({force: true})
		cy.get('.form-control').eq(6).clear({force: true}).type(rand, {force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.get('.btn-info').invoke('removeAttr', 'target').click()
		cy.contains(rand)
	})
})
