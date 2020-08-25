describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Keijo Käki',
      username: 'keijo',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')

  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('keijo')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Keijo Käki logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('keijo')
      cy.get('#password').type('qwerty')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('keijo')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#create-button').click()
      cy.get('#title').type('blogi')
      cy.get('#author').type('testaaja')
      cy.get('#url').type('http://testiurl.com')
      cy.get('#submit-button').click()

      cy.contains('blogi')
    })

    it('A blog can be liked', function() {
      cy.get('#create-button').click()
      cy.get('#title').type('blogi')
      cy.get('#author').type('testaaja')
      cy.get('#url').type('http://testiurl.com')
      cy.get('#submit-button').click()
      cy.get('#view-button').click()
      cy.get('#like-button').click()

      cy.contains('likes 1')
    })

    it('A blog can be removed', function() {
      cy.get('#create-button').click()
      cy.get('#title').type('blogi')
      cy.get('#author').type('testaaja')
      cy.get('#url').type('http://testiurl.com')
      cy.get('#submit-button').click()
      cy.get('#logout-button').click()
      cy.get('#username').type('keijo')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.get('#view-button').click()
      cy.get('#delete-button').click()
      cy.on('window:confirm', () => true)

      cy.get('html').should('not.contain', 'blogi')
    })

    it('blogs arranged by likes', function() {
      cy.get('#create-button').click()
      cy.get('#title').type('eka')
      cy.get('#author').type('testaaja')
      cy.get('#url').type('http://testiurl.com')
      cy.get('#submit-button').click()
      cy.get('#create-button').click()
      cy.get('#title').type('toka')
      cy.get('#author').type('testaaja')
      cy.get('#url').type('http://testiurl2.com')
      cy.get('#submit-button').click()
      cy.wait(6000)
      cy.contains('toka')
        .contains('view')
        .click()
      cy.get('#like-button').click()
      cy.get('#hide-button').click()
      cy.get('#view-button').click()
      cy.contains('http://testiurl2.com')
    })
  })
})