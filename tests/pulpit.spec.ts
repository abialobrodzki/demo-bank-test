import { test, expect } from '@playwright/test'
import { loginData } from '../test-data/login.data'

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId
    const userPassword = loginData.userPassword

    await page.goto('/')
    await page.getByTestId('login-input').fill(userId)
    await page.getByTestId('password-input').fill(userPassword)
    await page.getByTestId('login-button').click()
  })

  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const TransferReceiver = '3'
    const TransferAmount = '666'
    const TransferTitle = 'Zwrot Środków'
    const expectedTransferReceiver = 'Michael Scott'
    const expectedMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${TransferAmount},00PLN - ${TransferTitle}`

    // Act
    await page.waitForLoadState('domcontentloaded') // wait for page to fully load:

    await page
      .locator('#widget_1_transfer_receiver')
      .selectOption(TransferReceiver)
    await page.locator('#widget_1_transfer_amount').fill(TransferAmount)
    await page.locator('#widget_1_transfer_title').fill(TransferTitle)

    await page.locator('#execute_btn').click()
    await page.getByTestId('close-button').click()

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage)
  })

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const mobileReceiver = '500 xxx xxx'
    const mobileAmount = '19'
    const expectedMessage = `Doładowanie wykonane! ${mobileAmount},00PLN na numer ${mobileReceiver}`

    // Act
    await page.locator('#widget_1_topup_receiver').selectOption(mobileReceiver)
    await page.locator('#widget_1_topup_amount').fill(mobileAmount)
    // await page.locator('#uniform-widget_1_topup_agreement').click()  // alternatywa poniżej :)
    await page.locator('#uniform-widget_1_topup_agreement').check()
    await page.locator('#execute_phone_btn').click()
    await page.getByTestId('close-button').click()

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage)
  })

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const mobileReceiver = '500 xxx xxx'
    const mobileAmount = '19'
    const initialBalance = await page.locator('#money_value').innerText()
    const expectedBalance = Number(initialBalance) - Number(mobileAmount)

    // Act
    await page.locator('#widget_1_topup_receiver').selectOption(mobileReceiver)
    await page.locator('#widget_1_topup_amount').fill(mobileAmount)
    // await page.locator('#uniform-widget_1_topup_agreement').click()  // alternatywa poniżej :)
    await page.locator('#uniform-widget_1_topup_agreement').check()
    await page.locator('#execute_phone_btn').click()
    await page.getByTestId('close-button').click()

    // Assert
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`)
  })
})
