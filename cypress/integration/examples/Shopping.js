describe('Shopping functionality', function() {
    const admin = Cypress.env('ADMIN')
    const admin_password = Cypress.env('ADMIN_PASSWORD')
    const user = Cypress.env('USER')
    const user_password = Cypress.env('USER_PASSWORD')

    beforeEach(function() {
        console.log(Cypress.env())
        console.log("variable: ", admin, admin_password, user, user_password)

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
    it('test Shopping links', function() {
        

		cy.visit('https://staging.sparwelt.de/admin/econa/offer/deal/list',{
            auth: {
                username: admin,
                password: admin_password
        }
		})
		cy.get(':nth-child(1) > :nth-child(1) > .sonata-link-identifier').click()

        cy.visit('https://staging.sparwelt.de/admin/econa/offer/product/list',{
            auth: {
                username: admin,
                password: admin_password
        }
        })

		cy.get(':nth-child(1) > :nth-child(1) > .sonata-link-identifier').click()
	
	})
})
