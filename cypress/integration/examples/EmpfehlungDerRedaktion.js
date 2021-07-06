require('dotenv').config()
Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false
  })

describe('Redationsempfehlungen functionality', function() {
    const admin = Cypress.env('ADMIN')
    const admin_password = Cypress.env('ADMIN_PASSWORD')
    const user = Cypress.env('USER')
    const user_password = Cypress.env('USER_PASSWORD')
    let rand = Math.floor(Math.random() * 100)
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

    it('Empfehlungen', function() {
		cy.visit('https://staging.sparwelt.de/admin/econa/promotion/recommendationsslider/2924/edit',{
            auth: {
                username: admin,
                password: admin_password
            }
        }, 120000)

		cy.get('.icon-plus').click({force: true})
		cy.get('.modal-body').within(() => {
			cy.get('.select2-chosen').eq(0).click({force: true})
		})
		cy.get('.select2-result-label').eq(1).click({force: true})	
		cy.get('.modal-body').within(() => {
			cy.get('.form-control').eq(1).type('automatically generated slider item' + rand, {force: true})
			cy.get('.form-control').eq(2).type('übertitel', {force: true})
			cy.get('.form-control').eq(3).type('sparwelt.de', {force: true})
            cy.get('.form-control').eq(4).type('sparwelt.de', {force: true})
            cy.get('#mceu_347 > :nth-child(1)').click({force: true})
            const fileName = 'Slider Image.png'
			cy.fixture(fileName).then(fileContent => {
				cy.get('input[type=file]').eq(0).upload({fileContent, fileName, mimeType: 'image/png'});
			})
			cy.get('.btn').eq(4).click({force: true})

		})
		cy.contains('automatically generated slider item' + rand)
	})
})
