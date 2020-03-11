require('dotenv').config()

describe('Responsive Slider functionality', function() {

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

    it('creates a new item in the main page slider', function() {
		

        cy.visit('https://staging.sparwelt.de/admin/econa/promotion/responsiveslider/2976/edit',{
            auth: {
                username: admin,
                password: admin_password
            }
        })

		cy.get('.icon-plus').click({force: true})
		cy.wait(3000)
		cy.get('.modal-body').within(() => {
			cy.get('.select2-chosen').eq(0).click({force: true})
		})
		cy.get('.select2-result-label').eq(1).click({force: true})	
		cy.get('.modal-body').within(() => {
			cy.get('.form-control').eq(0).type('5', {force: true})
			cy.get('.form-control').eq(5).type('sparwelt.de', {force: true})
			cy.get('.form-control').eq(1).type('automatically generated slider item' + rand, {force: true})
			
			const fileName = 'Slider Image.png'
			cy.fixture(fileName).then(fileContent => {
				cy.get('input[type=file]').eq(0).upload({fileContent, fileName, mimeType: 'image/png'});
				cy.get('input[type=file]').eq(1).upload({fileContent, fileName, mimeType: 'image/png'});
			})
			cy.get('.btn').eq(2).click({force: true})

		})
		cy.wait(5000)
	})

	it('tests if the item is displayed', function () {
		cy.visit('https://staging.sparwelt.de/?' + cacheLoad, {
			auth: {
                username: admin,
                password: admin_password
            }
		})
		cy.get('.carousel-item-thumb-title').contains('automatically generated slider item' + rand)
	})
})
