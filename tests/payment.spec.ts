import { test, expect } from '@playwright/test'
import { loginData } from '../test-data/login.data'
import { LoginPage } from '../pages/login.pages'
import { PaymentPage } from '../pages/payment.pages'
import { PulpitPage } from '../pages/pulpit.pages'

test.describe('Payment tests', () => {
  let paymentPage: PaymentPage

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId
    const userPassword = loginData.userPassword

    await page.goto('/')
    const loginPage = new LoginPage(page)
    await loginPage.login(userId, userPassword)

    const pulpitPage = new PulpitPage(page)
    await pulpitPage.sideMenuComponent.paymentButton.click()

    paymentPage = new PaymentPage(page)
  })

  test(
    'simple payment test',
    {
      tag: ['@integration', '@payment'],
      annotation: [
        { type: 'happy path', description: 'Simple payment path test' },
        { type: 'documentation', description: 'Mozna dać opis i link do dokumentacji: https://playwright.info/' },
      ],
    },
    async ({ page }) => {
      // Arrange
      const transferReceiver = 'Jan Nowak'
      const transferAccount = '01 2345 6789 0123 4567 89012 34567'
      const transferAmount = '69'
      const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`

      // Act
      await paymentPage.makeTransfer(transferReceiver, transferAccount, transferAmount)

      // Assert
      await expect(paymentPage.messages).toHaveText(expectedMessage)
    },
  )
})
