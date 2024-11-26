import { test, expect } from '@playwright/test'
import { loginData } from '../test-data/login.data'
import { LoginPage } from '../pages/login.pages'
import { PulpitPage } from '../pages/pulpit.pages'

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
    const pulpitPage = new PulpitPage(page)
    await expect(pulpitPage.userName).toContainText(expectedUserName)
  })

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const userIdError = 'Test'
    const expectedErrorLoginId = 'identyfikator ma min. 8 znaków'

    // Act
    // await page.pause() //podgląd testów
    const loginPage = new LoginPage(page)
    await loginPage.loginInput.fill(userIdError)
    await loginPage.passwordInput.click()

    // Assert
    await expect(loginPage.errorLogin).toContainText(expectedErrorLoginId)
  })

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = loginData.userId
    const userPasswordError = '1234'
    const expectedErrorPassword = 'hasło ma min. 8 znaków'

    // Act
    const loginPage = new LoginPage(page)
    await loginPage.loginInput.fill(userId)
    await loginPage.passwordInput.fill(userPasswordError)
    await loginPage.passwordInput.blur() // utracenie fokusu na elemencie

    // Assert
    await expect(loginPage.errorPassword).toContainText(expectedErrorPassword)
  })
})
