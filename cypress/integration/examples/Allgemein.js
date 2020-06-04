require('dotenv').config()

describe('Allgemein functionality', function() {
	let rand = Math.floor(Math.random() * 10)
	let testtext = '+ automated test' + rand
    let cacheLoad = Math.random().toString(36).substr(2, 5)
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
        cy.location({ timeout: 5000 }).should((url) => {
            expect(url).to.match(/https:\/\/staging.sparwelt.de\/admin\/dashboard/)
        })
    })
    
   	it('Individuelle LP', function() {
		
		
		cy.visit('https://staging.sparwelt.de/admin/econa/page/pagestaticlandingpage/list',{
            auth: {
                username: admin,
                password: admin_password
            }
        })

        cy.get(':nth-child(1) > .sonata-ba-list-field-text > .sonata-link-identifier').click()
		cy.get('.form-control').first().clear({force: true}).type(testtext, {force: true})
        cy.get('[name="btn_update_and_edit"]').click()
		cy.get('.btn-info').invoke('removeAttr', 'target').click()
		cy.contains(testtext)
    })
    
	it('Kommentare', function() {	

		cy.visit('https://staging.sparwelt.de/admin/econa/comment/comment/list',{
            auth: {
                username: admin,
                password: admin_password
            }
        })

        cy.get(':nth-child(2) > .sonata-ba-list-field-html > .sonata-link-identifier').click()
		cy.get('.form-control').eq(1).type(testtext, {force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.contains('wurde erfolgreich bearbeitet.')

	})
	
	it('Statische Texte', function() {
		
		cy.visit('https://staging.sparwelt.de/admin/sparwelt/editablecontent/statictext/2214/edit',{
            auth: {
                username: admin,
                password: admin_password
            }
		})
		
		cy.get('.form-control').eq(1).clear({force: true}).type('1,3 Mio. ' + testtext, {force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.visit('https://staging.sparwelt.de?' + cacheLoad)
		cy.contains(testtext)
		
		
	})
})
