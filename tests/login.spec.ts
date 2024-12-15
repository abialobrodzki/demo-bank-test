import { test, expect } from '@playwright/test'
import { loginData } from '../test-data/login.data'
import { LoginPage } from '../pages/login.pages'
import { PulpitPage } from '../pages/pulpit.pages'

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    loginPage = new LoginPage(page)
  })

  test(
    'successful with correct credentials',
    {
      tag: ['@smoke', '@login'],
      annotation: [
        { type: 'happy path', description: 'Login with correct credentials path test' },
        { type: 'documentation', description: 'Mozna dać opis i link do dokumentacji: https://playwright.info/' },
      ],
    },
    async ({ page }) => {
      // Arrange
      const userId = loginData.userId
      const userPassword = loginData.userPassword
      const expectedUserName = 'Jan Demobankowy'

      // Act
      await loginPage.login(userId, userPassword)

      // Assert
      const pulpitPage = new PulpitPage(page)
      await expect(pulpitPage.userName).toContainText(expectedUserName)
    },
  )

  test(
    'unsuccessful login with too short username',
    {
      tag: ['@fail_path', '@login'],
      annotation: [
        { type: 'fail path', description: 'Login short username error path test' },
        { type: 'documentation', description: 'Mozna dać opis i link do dokumentacji: https://playwright.info/' },
      ],
    },
    async ({ page }) => {
      // Arrange
      const userIdError = 'Test'
      const expectedErrorLoginId = 'identyfikator ma min. 8 znaków'

      // Act
      // await page.pause() //podgląd testów
      await loginPage.loginInput.fill(userIdError)
      await loginPage.passwordInput.click()

      // Assert
      await expect(loginPage.errorLogin).toContainText(expectedErrorLoginId)
    },
  )

  test(
    'unsuccessful login with too short password',
    {
      tag: ['@fail_path', '@login'],
      annotation: [
        { type: 'fail path', description: 'Login short password error path test' },
        { type: 'documentation', description: 'Mozna dać opis i link do dokumentacji: https://playwright.info/' },
      ],
    },
    async ({ page }) => {
      // Arrange
      const userId = loginData.userId
      const userPasswordError = '1234'
      const expectedErrorPassword = 'hasło ma min. 8 znaków'

      // Act
      await loginPage.loginInput.fill(userId)
      await loginPage.passwordInput.fill(userPasswordError)
      await loginPage.passwordInput.blur() // utracenie fokusu na elemencie

      // Assert
      await expect(loginPage.errorPassword).toContainText(expectedErrorPassword)
    },
  )
})
