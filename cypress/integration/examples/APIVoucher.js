require('dotenv').config()
Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false
  })

describe('API voucher functionality', function() {
	let rand = Math.floor(Math.random() * 100)
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
        cy.get('.btn').click()
        cy.location({ timeout: 5000 }).should((url) => {
            expect(url).to.match(/https:\/\/staging.sparwelt.de\/admin\/dashboard/)
        })

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
		cy.contains('wurde erfolgreich bearbeitet')
	})
})
