describe('Login', () => {
  it('visit the login page', () => {
    // Arrange

    // Act
    cy.visit('/');

    // Assert
  });

  it('should name input has the focus when it clicks on it', () => {
    // Arrange
    // Act
    cy.visit('/');
    cy.get('input[name="user"]').click();

    // Assert
    cy.get('input[name="user"]').should('have.focus');
  });
  it('should show an alert with a message when type invalid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = '123456';
    const expectedErrorMessage = 'Usuario y/o password no válidos';
    // Act
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();
    // Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.findByText(expectedErrorMessage).should('be.visible');
  });
  it('should navigate to hotels url when type valid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = 'test';
    // Act
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();

    // Assert
    cy.url().should('equal', 'http://localhost:5173/#/submodule-list');
    cy.location('hash').should('equal', '#/submodule-list');
  });
});
