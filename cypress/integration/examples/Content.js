require('dotenv').config()

describe('Content functionality', function() {

	let rand = Math.floor(Math.random() * 10)
	let rand2 = Math.floor(Math.random() * 100)
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

	it('edits a silent article', function() {
				
		cy.visit('https://staging.sparwelt.de/admin/econa/app/generalarticle/list?contenttype=silentArticle',{
            auth: {
                username: admin,
				password: admin_password
			}
        })
		
		cy.get(':nth-child(1) > :nth-child(2) > .sonata-link-identifier').click()
		cy.get('.form-control').eq(1).type(' + automated test' + rand, {force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.get('.alert').contains('wurde erfolgreich bearbeitet.')
		cy.get('.btn-info').invoke('removeAttr', 'target').click()
		cy.contains(' + automated test')
	})
	
	it('creates and edits a tag', function() {
				
        cy.visit('https://staging.sparwelt.de/admin/econa/app/nodecluster/create',{
            auth: {
                username: admin,
				password: admin_password
			}
        })
		cy.get('.form-control').eq(0).type('automated test' + rand, {force: true})
		cy.get('.form-control').eq(1).type('automated test' + rand, {force: true})
		cy.get('#select2-chosen-1').click({force: true})
		cy.get('#select2-result-label-2').click({force: true})
		cy.get('[name="btn_create_and_edit"]').click()
		cy.get('.alert').contains('wurde erfolgreich hinzugefügt.')
		
		cy.get('.form-control').eq(0).type(rand, {force: true})
		cy.get('[name="btn_update_and_edit"]').click()

		cy.get('.alert').contains('wurde erfolgreich bearbeitet.')
	})
	
	it('Edit Content Stream', function() {
		

		cy.visit('https://staging.sparwelt.de/admin/econa/app/aggregationconfiguration/list',{
            auth: {
                username: admin,
				password: admin_password
			}
        })
		cy.get(':nth-child(11) > .sonata-ba-list-field-text > .sonata-link-identifier').click()
		
		cy.get('.form-control').eq(2).type(rand2, {force: true})
		cy.get('[name="btn_update_and_edit"]').click()

		cy.get('.alert').contains('wurde erfolgreich bearbeitet.')
		cy.contains(rand2)
	})

	it('edits a Freebie', function() {
		

        cy.visit('https://staging.sparwelt.de/admin/econa/app/generalarticle/list?contenttype=freebieArticle',{
            auth: {
                username: admin,
				password: admin_password
			}
        })
		cy.get(':nth-child(1) > :nth-child(2) > .sonata-link-identifier').click()
		cy.get('#select2-chosen-7').click({force: true})
		cy.get('#select2-result-label-14').click({force: true})
		cy.get('.form-control').eq(0).type(' + automated test' + rand, {force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.get('.alert').contains('wurde erfolgreich bearbeitet.')
		cy.get('.btn-info').invoke('removeAttr', 'target').click()
		cy.contains(' + automated test' + rand)
	})

	it('edits a Bargain', function() {
		
		
        cy.visit('https://staging.sparwelt.de/admin/econa/app/generalarticle/list?contenttype=bargainArticle',{
            auth: {
                username: admin,
				password: admin_password
			}
        })
		cy.get(':nth-child(1) > :nth-child(2) > .sonata-link-identifier').click()
		cy.get('#select2-chosen-7').click({force: true})
		cy.get('#select2-result-label-14').click({force: true})
		cy.get('.form-control').eq(0).type(' + automated test' + rand, {force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.get('.alert').contains('wurde erfolgreich bearbeitet.')
		cy.get('.btn-info').invoke('removeAttr', 'target').click()
		cy.contains(' + automated test' + rand)
	})
	
})
