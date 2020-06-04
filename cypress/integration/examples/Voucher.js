require('dotenv').config()

describe('Voucher functionality', function() {
	let rand = Math.floor(Math.random() * 100)
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

	
	it('creates and edits a voucher', function() {

        cy.visit('https://staging.sparwelt.de/admin/econa/offer/voucher/create',{
            auth: {
                username: admin,
                password: admin_password
            }
        })

		cy.get('.form-control').eq(6).type(rand, {force: true})
		cy.get('#select2-chosen-8').click({force: true})
		cy.get('#s2id_autogen8_search').type('OTTO (de){enter}', {force: true})
		cy.get('[name="btn_create_and_edit"]').click()
		cy.get('.alert').contains('wurde erfolgreich hinzugefügt.')
		cy.get('.form-control').eq(0).type(' + Edittest', {force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.get('.alert').contains('wurde erfolgreich bearbeitet.')
		cy.get('.btn-info').invoke('removeAttr', 'target').click()
		cy.contains(rand + '€-Gutschein ohne Mindestbestellwert')
		
	})
	
	it('deactivates a voucher', function() {

        cy.visit('https://staging.sparwelt.de/admin/econa/offer/voucher/list',{
            auth: {
                username: admin,
                password: admin_password
            }
        })

		cy.get('#filter_title_value').type(rand + '€-Gutschein ohne Mindestbestellwert + Edittest{enter}')
		cy.get('.sonata-link-identifier').first().click()
		cy.get('#select2-chosen-15').click({force: true})   
		cy.get('#select2-result-label-23').click()
		cy.get('[name="btn_update_and_edit"]').click()
		cy.get('.btn-info').invoke('removeAttr', 'target').click()
		cy.contains(rand +'€-Gutschein ohne Mindestbestellwert').should('not.exist')
	})
	
	it('deletes a voucher', function() {

		cy.get('.sidebar-menu > :nth-child(3) > [href="#"]').click()
        cy.get('.treeview.active > .active > .first > a').click()
		cy.get('#filter_title_value').type(rand + '€-Gutschein ohne Mindestbestellwert + Edittest{enter}')
		cy.get('.sonata-link-identifier').first().click()
		cy.get('.btn-danger').click()
		cy.get('.btn-danger').click()
		cy.get('.alert').contains('wurde erfolgreich gelöscht.')
	})
})
