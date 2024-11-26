import { test, expect } from '@playwright/test'
import { loginData } from '../test-data/login.data'
import { LoginPage } from '../pages/login.pages'

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('successful with correct credentials', async ({ page }) => {
    // Arrange
    const userId = loginData.userId
    const userPassword = loginData.userPassword
    const expectedUserName = 'Jan Demobankowy'

    // Act
    const loginPage = new LoginPage(page)
    await loginPage.loginInput.fill(userId)
    await loginPage.passwordInput.fill(userPassword)
    await loginPage.loginButton.click()

    // Assert
    await expect(page.getByTestId('user-name')).toContainText(expectedUserName)
  })

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const userIdError = 'Test'
    const expectedErrorLoginId = 'identyfikator ma min. 8 znaków'

    // Act
    // await page.pause() //podgląd testów
    await page.getByTestId('login-input').fill(userIdError)
    await page.getByTestId('password-input').click()

    // Assert
    await expect(page.getByTestId('error-login-id')).toContainText(
      expectedErrorLoginId,
    )
  })

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = loginData.userId
    const userPasswordError = '1234'
    const expectedErrorPassword = 'hasło ma min. 8 znaków'

    // Act
    await page.getByTestId('login-input').fill(userId)
    await page.getByTestId('password-input').fill(userPasswordError)
    await page.getByTestId('password-input').blur() // utracenie fokusu na elemencie

    // Assert
    await expect(page.getByTestId('error-login-password')).toContainText(
      expectedErrorPassword,
    )
  })
})
