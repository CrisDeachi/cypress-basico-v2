it('Seção 8 - Extra 2 Desafio - Testa a página de políticade privacidade de forma independente', function() {
    cy.visit ('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
})