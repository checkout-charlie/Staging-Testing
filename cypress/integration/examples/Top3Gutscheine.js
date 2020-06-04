require('dotenv').config()

describe('Top 3 Gutscheine functionality', function() {
	let cacheLoad = Math.random().toString(36).substr(2, 5)
	let rand2 = Math.floor(Math.random() * 100)
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

    it('creates a new item in category slider', function() {
	
		cy.visit('https://staging.sparwelt.de/admin/econa/offer/voucher/create',{
			auth: {
                username: admin,
                password: admin_password
			}
		})
	
		cy.get('.form-control').eq(6).type('Test für Top 3 Gutscheine' + rand2, {force: true})
		cy.get('#select2-chosen-8').click({force: true})
		cy.get('#s2id_autogen8_search').type('OTTO (de){enter}', {force: true})
		cy.get('[name="btn_create_and_edit"]').click()
		
		let voucher = 0;
		cy.url().then((url) => {
			let urlArr = url.split("/")
			voucher = urlArr[7]
		})
		
		cy.visit('https://staging.sparwelt.de/admin/econa/promotion/topvouchersslider/2922/edit',{
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
			cy.get('.form-control').eq(5).type(voucher, {force: true})
			cy.get('.form-control').eq(1).type('automatically generated Top 3 Gutschein' + rand2, {force: true})
			
			const fileName = 'Top 3 Bild.png'
			cy.fixture(fileName).then(fileContent => {
				cy.get('input[type=file]').eq(0).upload({fileContent, fileName, mimeType: 'image/png'});
			})
			
		cy.get('.btn').eq(2).click({force: true})
		})
	})


	it("checks if the Top 3 Voucher is displayed", function() {

		cy.visit('https://staging.sparwelt.de/?' + cacheLoad, {
            auth: {
                username: admin,
                password: admin_password
            }
        })
		cy.contains('automatically generated Top 3 Gutschein' + rand2)
		

	})
})
