import { test, expect } from '@playwright/test'
import { loginData } from '../test-data/login.data'
import { LoginPage } from '../pages/login.pages'

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId
    const userPassword = loginData.userPassword

    await page.goto('/')
    const loginPage = new LoginPage(page)
    await loginPage.loginInput.fill(userId)
    await loginPage.passwordInput.fill(userPassword)
    await loginPage.loginButton.click()
    await page.getByRole('link', { name: 'płatności' }).click()
  })

  test('simple payment test', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Jan Nowak'
    const transferAccount = '01 2345 6789 0123 4567 89012 34567'
    const transferAmount = '69'
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`
    // Act
    await page.getByTestId('transfer_receiver').fill(transferReceiver)
    await page.getByTestId('form_account_to').fill(transferAccount)
    await page.getByTestId('form_amount').fill(transferAmount)
    await page.getByRole('button', { name: 'wykonaj przelew' }).click()
    await page.getByTestId('close-button').click()
    // Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage)
  })
})
