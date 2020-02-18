describe('Allgemein functionality', function() {
	let rand = Math.floor(Math.random() * 10)
	let testtext = '+ automated test' + rand
    let cacheLoad = Math.random().toString(36).substr(2, 5)
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
	
        cy.visit('https://staging.sparwelt.de/admin/login',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
        cy.get('input#username.form-control').type('PhilippH')
        cy.get('input#password.form-control').type('Ppu1+aph=WPR')
        cy.contains('Sign In').click()
		
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
		//cy.visit('https://staging.sparwelt.de/gratis/cashback')
		//cy.contains(testtext)

	})
	
	it('Statische Texte', function() {
		
        cy.visit('https://staging.sparwelt.de/admin/login',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
        cy.get('input#username.form-control').type('PhilippH')
        cy.get('input#password.form-control').type('Ppu1+aph=WPR')
        cy.contains('Sign In').click()

		cy.visit('https://staging.sparwelt.de/admin/sparwelt/editablecontent/statictext/2214/edit',{
            auth: {
                username: admin,
                password: admin_password
            }
		})
		
		cy.get('.form-control').eq(1).clear({force: true}).type('1,3 Mio. ' + testtext, {force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.wait(3000)
		cy.visit('https://staging.sparwelt.de?' + cacheLoad)
		cy.contains(testtext)
		
		
	})
})
