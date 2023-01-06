Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Cristiane')
    cy.get('#lastName').type('Candido')
    cy.get('#email').type('crisdeachi@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click
})