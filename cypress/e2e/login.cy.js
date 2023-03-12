// https://github.com/bahmutov/cypress-data-session
// import the cypress-data-session plugin
// to use the cy.dataSession command

beforeEach(() => {
  // every test can register the user by filling out the form
  const username = `cy-${Cypress._.random(1e6)}`
  const email = username + '@acme.co'
  const password = `!secret-${Cypress._.random(1e6)}`
  // because the routing in this application is client-side
  // we cannot directly visit the /register page
  // and instead must go from the home page
  cy.visit('/')
  cy.contains('a', 'Sign up').click()
  cy.location('pathname').should('equal', '/register')
  // fill the sign up form
  cy.get('input[placeholder=Username]').type(username)
  cy.get('input[placeholder=Email]').type(email)
  cy.get('input[placeholder=Password]').type(password)
  cy.contains('button', 'Sign up').click()
  // we should end up back on the home page
  cy.location('pathname').should('equal', '/')
  // and we should be logged in
  cy.contains('a.nav-link', username).should('be.visible')
  // how does the page "stay" logged in?
  // inspect the DevTools application tab to find out
  // Can you preserve the main information in the data session:
  // the username, the email, the password, and whatever
  // information is necessary to recreate the logged in state
})

// the test should start at the home page
// and immediately be logged in
it('is logged in', function () {
  cy.location('pathname').should('equal', '/')
  // we can check if the user is logged in by confirming
  // the profile navigation link is there
  // cy.contains('a.nav-link', this.user.username).should('be.visible')
})
