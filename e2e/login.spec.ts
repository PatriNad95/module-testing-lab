import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('visit the login page', async ({ page }) => {
    // Arrange

    // Act
    await page.goto('/');

    // Assert
  });

  test('should name input has the focus when it clicks on it', async ({
    page,
  }) => {
    // Arrange
    await page.goto('/');
    const userInput = page.locator('input[name="user"]');

    // Act
    await userInput.click();

    // Assert
    await expect(userInput).toBeFocused();
  });

  test('should show an alert with a message when type invalid credentials', async ({
    page,
  }) => {
    // Arrange
    const user = 'admin';
    const password = '123456';
    const expectedErrorMessage = 'Usuario y/o password no válidos';

    await page.goto('/');

    const userInput = page.getByRole('textbox', { name: 'Usuario *' });
    const passwordInput = page.getByLabel('Contraseña *');

    // Act
    await userInput.fill(user);
    await passwordInput.fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert
    await expect(userInput).toHaveValue(user);
    await expect(passwordInput).toHaveValue(password);
    await expect(page.getByText(expectedErrorMessage)).toBeVisible();
  });

  test('should navigate to hotels url when type valid credentials', async ({
    page,
  }) => {
    // Arrange
    const user = 'admin';
    const password = 'test';

    await page.goto('/');

    const userInput = page.getByRole('textbox', { name: 'Usuario *' });
    const passwordInput = page.getByLabel('Contraseña *');

    // Act
    await userInput.fill(user);
    await passwordInput.fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert
    // Verifica la URL completa
    await expect(page).toHaveURL('http://localhost:5173/#/submodule-list');

    // Si necesitas validar específicamente solo el hash:
    const url = new URL(page.url());
    expect(url.hash).toBe('#/submodule-list');
  });
});
