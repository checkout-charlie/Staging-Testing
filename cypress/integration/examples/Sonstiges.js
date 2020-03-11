require('dotenv').config()

describe('Sonstiges functionality', function() {
	
	let rand = Math.floor(Math.random() * 100)
	let testtext = 'automated test' + rand
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

    it('tests less important links', function() {
				
		
		cy.visit('https://staging.sparwelt.de/admin/econa/marketing/media/list?campaign=marketing_media.editors_lp',{
            auth: {
                username: admin,
                password: admin_password
            }
		})
		cy.visit('https://staging.sparwelt.de/admin/econa/marketing/media/list?campaign=marketing_media.sem_lp',{
            auth: {
                username: admin,
                password: admin_password
            }
		})	
		cy.visit('https://staging.sparwelt.de/admin/econa/marketing/media/list?campaign=marketing_media.single_optin_lp',{
            auth: {
                username: admin,
                password: admin_password
            }
		})		
	
	})
	
    it('creates and edits Editors-LPs', function() {
				
        cy.visit('https://staging.sparwelt.de/admin/econa/marketing/campaign/create?campaign=marketing_campaign.editors_lp',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
		cy.get('.form-control').first().type(testtext, {force: true})
		cy.get('#select2-chosen-1').click({force: true})
		cy.get('#select2-result-label-4').click({force: true})
		cy.get('.form-control').eq(3).type(testtext, {force: true})
		cy.get('[name="btn_create_and_edit"]').click()
		cy.get('.alert').contains('wurde erfolgreich')
		
		cy.get('.form-control').first().type(rand, {force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.get('.btn-info').invoke('removeAttr', 'target').click()
		cy.contains(testtext + rand)
		
		
	})
	
    it('creates and edits SEM-LPs', function() {
		
	
        cy.visit('https://staging.sparwelt.de/admin/econa/marketing/campaign/create?campaign=marketing_campaign.sem_lp',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
		cy.get('.form-control').first().type(testtext, {force: true})
		cy.get('#select2-chosen-2').click({force: true})
		cy.get('#select2-result-label-4').click({force: true})
		cy.get('.form-control').eq(3).type(testtext, {force: true})
		cy.get('[name="btn_create_and_edit"]').click()
		cy.get('.alert').contains('wurde erfolgreich')
		
		cy.get('.form-control').first().type(rand, {force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.get('.btn-info').invoke('removeAttr', 'target').click()
		cy.contains(testtext + rand)

	})
})
