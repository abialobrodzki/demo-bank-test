import { test, expect } from '@playwright/test'
import { loginData } from '../test-data/login.data'
import { LoginPage } from '../pages/login.pages'
import { PulpitPage } from '../pages/pulpit.pages'

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId
    const userPassword = loginData.userPassword

    await page.goto('/')
    const loginPage = new LoginPage(page)
    await loginPage.login(userId, userPassword)

    pulpitPage = new PulpitPage(page)
  })

  test('quick payment with correct data', { tag: ['@integration', '@pulpit'] }, async ({ page }) => {
    // Arrange
    const TransferReceiver = '3'
    const TransferAmount = '666'
    const TransferTitle = 'Zwrot Środków'
    const expectedTransferReceiver = 'Michael Scott'
    const expectedMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${TransferAmount},00PLN - ${TransferTitle}`

    // Act
    await pulpitPage.executeQuickPayment(TransferReceiver, TransferAmount, TransferTitle)

    // Assert
    await expect(pulpitPage.messages).toHaveText(expectedMessage)
  })

  test('successful mobile top-up', { tag: ['@integration', '@pulpit'] }, async ({ page }) => {
    // Arrange
    const mobileReceiver = '500 xxx xxx'
    const mobileAmount = '19'
    const expectedMessage = `Doładowanie wykonane! ${mobileAmount},00PLN na numer ${mobileReceiver}`

    // Act
    await pulpitPage.executeMobileTopUp(mobileReceiver, mobileAmount)

    // Assert
    await expect(pulpitPage.messages).toHaveText(expectedMessage)
  })

  test('correct balance after successful mobile top-up', { tag: ['@integration', '@pulpit'] }, async ({ page }) => {
    // Arrange
    const mobileReceiver = '500 xxx xxx'
    const mobileAmount = '19'
    const initialBalance = await pulpitPage.moneyValue.innerText()
    const expectedBalance = Number(initialBalance) - Number(mobileAmount)

    // Act
    await pulpitPage.executeMobileTopUp(mobileReceiver, mobileAmount)

    // Assert
    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`)
  })
})
