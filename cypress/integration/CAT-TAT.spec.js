// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit ('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Extra 1 - Preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste de automação, teste de automação, teste de automação, teste de automação, teste de automação'
        cy.get('#firstName').type('Cristiane')
        cy.get('#lastName').type('Candido')
        cy.get('#email').type('crisdeachi@gmail.com')
        cy.get('#open-text-area').type(longText, {delay:0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
    
    it('Extra 2- Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Cristiane')
        cy.get('#lastName').type('Candido')
        cy.get('#email').type('crisdeachi@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Extra 3 - Campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
        .type('abcdeghij')
        .should('have.value', '')
    })

    it('Extra 4 - Exibe msg de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Cristiane')
        cy.get('#lastName').type('Candido')
        cy.get('#email').type('crisdeachi@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Extra 5 - preencha e limpa os campos nomne, sobrenome, email e telefone', function() {
        cy.get('#firstName')
        .type('Cristiane')
        .should('have.value', 'Cristiane')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('Candido')
        .should('have.value', 'Candido')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('crisdeachi@gmail.com')
        .should('have.value', 'crisdeachi@gmail.com')
        .clear()
        .should('have.value', '')
        cy.get('#phone')
        .type('1234567890')
        .should('have.value', '1234567890')
        .clear()
        .should('have.value', '')
    })
    it('Extra 6 e 8 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
       cy.contains('button', 'Enviar').click()
       cy.get('.error').should('be.visible')
    })

    it('Extra 7- Comandos customizados - Envio o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit ()

        cy.get('.success').should('be.visible')
    })

    it('Seleção suspensa - Exercicio - Seleciona um produto (Youtube) por seu texto', function() {
        cy.get('#product')  
          .select('YouTube')
          .should('have.value' , 'youtube')
          
    })

    it('Seleção suspensa - Extra 1 - Seleciona um produto (Mentoria) por seu valor', function() {
        cy.get('#product')  
          .select('mentoria')
          .should('have.value' , 'mentoria')
          
    })
    
    it('Seleção suspensa - Extra 2 - Seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')  
          .select(1)
          .should('have.value' , 'blog')
          
    })

    it('Marcando inputs do tipo radio - Exercício - Marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]').check()
          .check()
          .should('have.value', 'feedback')    

    })

    it('Marcando inputs do tipo radio - Extra - Marca cada tipo de atendimento ', function() {
        cy.get('input[type="radio"]')
          .should('have.length',3) 
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })                 

    })

    it('Marcando e desmarcando inputs do tipo checkbox - Exercício - Marca ambos checkbox e deposi desmarca', function() {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')

    })

    it('Marcando e desmarcando inputs do tipo checkbox - Extra - Exibe msg de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Cristiane')
        cy.get('#lastName').type('Candido')
        cy.get('#email').type('crisdeachi@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

   it('Seleciona arquivo da pasta Fixtures', function() {
        cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
          
    })

    it('Seleciona arquivo simulando um drag-and-drop "usuário arrasta o aquivo" - Extra 1', function() {
        cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
          
    })

    it('Seleciona arquivo utilizando uma fixture a qual foi dado um alias - Extra 2', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Extra 1 - acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

})

