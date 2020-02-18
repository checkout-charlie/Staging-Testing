describe('Einstellungen functionality', function() {
	
	let rand = Math.floor(Math.random() * 100)
	let testtext = "automated test" + rand
    let redirect = "/kategorien/mode-und-accessoires/testweiterleitung" + rand
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

    it('Blacklist', function() {
		
		
        cy.visit('https://staging.sparwelt.de/admin/econa/comment/blacklist/create',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
		cy.get('.form-control').first().type(testtext, {force: true})
		cy.get('[name="btn_create_and_list"]').click()
		cy.contains(testtext)
	})
	
	it('Deeplink', function() {
		
		
        cy.visit('https://staging.sparwelt.de/admin/econa/content/deeplink/create',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
		cy.get('.form-control').first().type('https://clk.tradedoubler.com/click?a(1550 ' + rand, {force: true})
		cy.get('[name="btn_create_and_list"]').click()
		cy.contains('https://clk.tradedoubler.com/click?a(1550 ' + rand)
	})
	
	it('Weiterleitung', function() {
		

        cy.visit('https://staging.sparwelt.de/admin/econa/content/redirect/create',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
		cy.get('.form-control').first().type(redirect, {force: true})
		cy.get('.form-control').eq(1).type('/gratis', {force: true})
		cy.get('[name="btn_create_and_list"]').click()
		cy.visit('https://staging.sparwelt.de/kategorien/mode-und-accessoires/testweiterleitung' + rand)
		cy.url().should('include', 'gratis')
	})
	
    it('Sperrlisteneinträge', function() {
		

		
        cy.visit('https://staging.sparwelt.de/admin/econa/provider/shoppingshop/create',{
            auth: {
                username: admin,
                password: admin_password
            }
        })


		let sperrshop = "Sperrlistenshop" + rand
		cy.get('.form-control').eq(0).type(sperrshop, {force: true})
		cy.get('.form-control').eq(1).type('sparwelt.de', {force: true})
		cy.get('#mceu_49-open > .mce-txt').click({force: true})
		cy.get('#mceu_137').click({force: true})
		cy.get('#mceu_140').type('short description', {force: true})
		cy.get('#mceu_142 > button').click()
		cy.get('#mceu_116-open > .mce-txt').click({force: true})
		cy.get('#mceu_145-text').click({force: true})
		cy.get('#mceu_148').type('long description', {force: true})
		cy.get('#mceu_150 > button').click()
		cy.get('#select2-chosen-3').click({force: true})
		cy.get('#select2-result-label-21').click({force: true})
		cy.get('.form-control').eq(29).type('sparwelt.de', {force: true})
		cy.get('.form-control').eq(30).type('https://www.sparwelt.de', {force: true})
		cy.get('#select2-chosen-14').click({force: true})
		cy.get('#select2-result-label-23').click({force: true})
        cy.get('[name="btn_create_and_edit"]').click()
        
        let sperrUrl = ''
		cy.url().then((url) => {
            sperrUrl = url
            cy.visit('https://staging.sparwelt.de/admin/econa/provider/shoppingshoprestriction/create',{
                auth: {
                    username: admin,
                    password: admin_password
                    }
            })
            cy.get('.form-control').first().type('Testvermerk' + rand, {force: true})
            cy.get('.form-control').eq(2).type('Tester', {force: true})
            cy.get('#select2-chosen-1').click({force: true})
            cy.get('#s2id_autogen1_search').type(sperrshop + '{enter}', {force: true})
            cy.get('[name="btn_create_and_edit"]').click()
    
            cy.get('.form-control').first().type(rand/2, {force: true})
            cy.get('[name="btn_update_and_edit"]').click()
            cy.visit(sperrUrl,{
                auth: {
                    username: admin,
                    password: admin_password
                    }
            })
            cy.get('.ui-dialog')
            cy.get('#overlay-restriction > :nth-child(1)').contains(rand/2)
            cy.get('.btn-danger').click()
            cy.get('.btn-danger').click()       
        })

        
    })
    
    it('Edit User', function() {
		
		
        cy.visit('https://staging.sparwelt.de/admin/econa/user/baseuser/2222570/edit',{
            auth: {
                username: admin,
                password: admin_password
            }
        })

		cy.get('.form-control').first().clear({force: true}).type(testtext, {force: true})
		cy.get('[name="btn_update_and_edit"]').click()
		cy.contains(testtext)
	})
	
	it('Create and edit admin', function() {
		

        cy.visit('https://staging.sparwelt.de/admin/econa/user/adminuser/78299/edit',{
            auth: {
                username: admin,
                password: admin_password
            }
        })

		cy.visit('https://staging.sparwelt.de/admin/econa/user/adminuser/create',{
            auth: {
                username: admin,
                password: admin_password
            }
        })	
    })
})
