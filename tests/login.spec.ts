import { test, expect } from '@playwright/test'

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/'
    await page.goto(url)
  })

  test('successful with correct credentials', async ({ page }) => {
    // Arrange
    const userId = 'TestTest'
    const userPassword = 'test1234'
    const expectedUserName = 'Jan Demobankowy'

    // Act
    await page.getByTestId('login-input').fill(userId)
    await page.getByTestId('password-input').fill(userPassword)
    await page.getByTestId('login-button').click()

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
    const userId = 'TestTest'
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
