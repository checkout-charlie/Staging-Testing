describe('Shopping functionality', function() {
    it('edits stuff', function() {
		
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