require('dotenv').config()

describe('Partner functionality continued', function() {
	let rand = Math.floor(Math.random() * 100)
	let partner = "Testpartner " + rand
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

    it('edits Partner Listings Top Shops', function() {
            
        
        cy.visit('https://staging.sparwelt.de/admin/econa/syndication/partnerlisting/30/edit?partner=297',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
        cy.get('.sonata-ba-field').eq(7).within(() => {
            cy.get('.form-control').eq(2).children().its('length').then((num) => {
                cy.get('.form-control').eq(1).children().first().dblclick({force: true})
                cy.get('.form-control').eq(2).children().should('have.length', num+1)

            })
        })
        
        cy.get('.sonata-ba-field').eq(8).within(() => {
            cy.get('.form-control').eq(2).children().its('length').then((num) => {
                cy.get('.form-control').eq(1).children().first().dblclick({force: true})
                cy.get('.form-control').eq(2).children().should('have.length', num+1)

            })
        })

        cy.get('[name="btn_update_and_edit"]').click()
        cy.get('.alert').contains('wurde erfolgreich bearbeitet.')
    })

    it('edits a Partner Slider', function() {

        cy.visit('https://staging.sparwelt.de/admin/econa/syndication/slider/22301/edit?partner=299',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
        cy.get('.icon-plus').click({force: true})
        cy.get('.modal-body').within(() => {
            cy.get('.select2-chosen').eq(1).click({force: true})
        })
        cy.get('.select2-result-label').eq(1).click({force: true})	
        cy.get('.modal-body').within(() => {
            cy.get('.form-control').eq(0).type('5', {force: true})
            cy.get('.form-control').eq(1).type('automatically generated Partner Slider Item' + rand, {force: true})
            cy.get('.form-control').eq(8).type('sparwelt.de', {force: true})

            
            const fileName = 'Slider Image.png'
            cy.fixture(fileName).then(fileContent => {
                cy.get('input[type=file]').eq(0).upload({fileContent, fileName, mimeType: 'image/png'});
                cy.get('input[type=file]').eq(1).upload({fileContent, fileName, mimeType: 'image/png'});
            })
            
            cy.get('.btn').eq(1).click({force: true})
        })
        cy.contains('automatically generated Partner Slider Item' + rand)
    })

    it('edits a Promotion Card', function() {
        cy.visit('https://staging.sparwelt.de/admin/econa/syndication/slider/22302/edit?partner=299',{
            auth: {
                username: admin,
                password: admin_password
            }
        })
        cy.get('.icon-plus').click({force: true})
        cy.get('.modal-body').within(() => {
            cy.get('.select2-chosen').eq(1).click({force: true})
        })
        cy.get('.select2-result-label').eq(1).click({force: true})	
        cy.get('.modal-body').within(() => {
            cy.get('.form-control').eq(0).type('5', {force: true})
            cy.get('.form-control').eq(1).type('automatically generated Partner Slider Item' + rand, {force: true})
            cy.get('.form-control').eq(8).type('sparwelt.de', {force: true})

            const fileName = 'Slider Image.png'
            cy.fixture(fileName).then(fileContent => {
                cy.get('input[type=file]').eq(0).upload({fileContent, fileName, mimeType: 'image/png'});
                cy.get('input[type=file]').eq(1).upload({fileContent, fileName, mimeType: 'image/png'});
            })
            
            cy.get('.btn').eq(1).click({force: true})

        })
        cy.contains('automatically generated Partner Slider Item' + rand)
    })

})
