import { test, expect } from '@playwright/test'

test.describe('User login to Demobank', () => {

  test('successful with correct credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/')
    await page.getByTestId('login-input').fill('TestTest')
    await page.getByTestId('password-input').fill('test1234')
    await page.getByTestId('login-button').click()

    await expect(page.getByTestId('user-name')).toContainText(
      'Jan Demobankowy'
    )
  })

  test('unsuccessful login with too short username', async ({
    page,
  }) => {
    // await page.pause() //podgląd testów
    await page.goto('https://demo-bank.vercel.app/')
    await page.getByTestId('login-input').fill('Test')
    await page.getByTestId('password-input').click()

    await expect(page.getByTestId('error-login-id')).toContainText(
      'identyfikator ma min. 8 znaków'
    )
  })

  test('unsuccessful login with too short password', async ({
    page,
  }) => {
    await page.goto('https://demo-bank.vercel.app/')
    await page.getByTestId('login-input').fill('TestTest')
    await page.getByTestId('password-input').fill('1234')
    await page.getByTestId('password-input').blur() // utracenie fokusu na elemencie

    await expect(page.getByTestId('error-login-password')).toContainText(
      'hasło ma min. 8 znaków'
    )
  })
})
