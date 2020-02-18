describe('Shop functionality', function() {
	let rand = Math.floor(Math.random() * 100)
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

    it('creates and edits a shop', function() {
		
        cy.visit('https://staging.sparwelt.de/admin/econa/provider/shoppingshop/create',{
            auth: {
                username: admin,
                password: admin_password
            }
        })


		cy.get('.form-control').eq(0).type('automatically created testshop' + rand, {force: true})
		cy.get('.form-control').eq(1).type('sparwelt.de', {force: true})
		cy.get('#select2-chosen-3').click({force: true})
		cy.get('#select2-result-label-21').click({force: true})
		cy.get('.form-control').eq(29).type('sparwelt.de', {force: true})
		cy.get('.form-control').eq(30).type('https://www.sparwelt.de', {force: true})
		cy.get('#select2-chosen-14').click({force: true})
		cy.get('#select2-result-label-23').click({force: true})
		cy.get('#mceu_49-open > .mce-txt').click({force: true})
		cy.get('#mceu_137').click({force: true})
		cy.get('#mceu_140').type('short description', {force: true})
		cy.get('#mceu_142 > button').click()
		cy.get('#mceu_116-open > .mce-txt').click({force: true})
		cy.get('#mceu_145-text').click({force: true})
		cy.get('#mceu_148').type('long description', {force: true})
		cy.get('#mceu_150 > button').click()
		
		cy.get('[name="btn_create_and_edit"]').click()
		cy.get('.alert').contains('wurde erfolgreich hinzugefügt.')
		cy.get('.form-control').eq(0).type(' + Edit', {force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.get('.alert').contains('Edit (de)" wurde erfolgreich bearbeitet.')
		cy.wait(3000)
		cy.get('.btn-info').eq(0).invoke('removeAttr', 'target').click()
		cy.contains('+ Edit')
	})
    it('deactivates a Shop', function() {
        cy.visit('https://staging.sparwelt.de/admin/econa/provider/shoppingshop/list',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
		
		//cy.get('.sidebar-menu > :nth-child(3) > [href="#"]').click()
        //cy.get('.treeview.active > .active > :nth-child(3) > a').click()
		cy.get('#filter_title_value').type('automatically created testshop' + rand  +'{enter}')
		cy.get('.sonata-link-identifier').first().click()
		cy.get('#select2-chosen-3').click({force: true})
		cy.get('#select2-result-label-20').click({force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.wait(5000)
		cy.request({
			failOnStatusCode: false,
			url: 'https://staging.sparwelt.de/gutscheine/automatically-created-testshop?' + cacheLoad}).then((response) => {
				expect(response.status).to.eq(404)
			})
	})
    it('deletes a Shop', function() {

		cy.visit('https://staging.sparwelt.de/admin/econa/provider/shoppingshop/list',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
		
		cy.get('#filter_title_value').type('automatically created testshop' + rand  +'{enter}')
		cy.get('.sonata-link-identifier').first().click()
		cy.get('.btn-danger').click()
		cy.get('.btn-danger').click()
		cy.get('.alert').contains('wurde erfolgreich gelöscht.')
	})
})
