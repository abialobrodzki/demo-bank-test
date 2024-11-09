import { test, expect } from '@playwright/test'

test.describe('User login to Demobank', () => {
  test('successful with correct credentials', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/'
    const userId = 'TestTest'
    const userPassword = 'test1234'
    const expectedUserName = 'Jan Demobankowy'

    // Act
    await page.goto(url)
    await page.getByTestId('login-input').fill(userId)
    await page.getByTestId('password-input').fill(userPassword)
    await page.getByTestId('login-button').click()

    // Assert
    await expect(page.getByTestId('user-name')).toContainText(expectedUserName)
  })

  test('unsuccessful login with too short username', async ({ page }) => {
    // await page.pause() //podgląd testów
    await page.goto('https://demo-bank.vercel.app/')
    await page.getByTestId('login-input').fill('Test')
    await page.getByTestId('password-input').click()

    await expect(page.getByTestId('error-login-id')).toContainText(
      'identyfikator ma min. 8 znaków',
    )
  })

  test('unsuccessful login with too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/')
    await page.getByTestId('login-input').fill('TestTest')
    await page.getByTestId('password-input').fill('1234')
    await page.getByTestId('password-input').blur() // utracenie fokusu na elemencie

    await expect(page.getByTestId('error-login-password')).toContainText(
      'hasło ma min. 8 znaków',
    )
  })
})
