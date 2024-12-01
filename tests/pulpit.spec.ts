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

  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const TransferReceiver = '3'
    const TransferAmount = '666'
    const TransferTitle = 'Zwrot Środków'
    const expectedTransferReceiver = 'Michael Scott'
    const expectedMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${TransferAmount},00PLN - ${TransferTitle}`

    // Act
    await page.waitForLoadState('domcontentloaded') // wait for page to fully load:

    await pulpitPage.transferReceiver.selectOption(TransferReceiver)
    await pulpitPage.transferAmount.fill(TransferAmount)
    await pulpitPage.transferTitle.fill(TransferTitle)

    await pulpitPage.executeButton.click()
    await pulpitPage.closeButton.click()

    // Assert
    await expect(pulpitPage.messages).toHaveText(expectedMessage)
  })

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const mobileReceiver = '500 xxx xxx'
    const mobileAmount = '19'
    const expectedMessage = `Doładowanie wykonane! ${mobileAmount},00PLN na numer ${mobileReceiver}`

    // Act
    await pulpitPage.topupReceiver.selectOption(mobileReceiver)
    await pulpitPage.topupAmount.fill(mobileAmount)
    // await page.locator('#uniform-widget_1_topup_agreement').click()  // alternatywa poniżej :)
    await pulpitPage.topupAgreement.check()
    await pulpitPage.topupExecuteButton.click()
    await pulpitPage.closeButton.click()

    // Assert
    await expect(pulpitPage.messages).toHaveText(expectedMessage)
  })

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const mobileReceiver = '500 xxx xxx'
    const mobileAmount = '19'
    const initialBalance = await pulpitPage.moneyValue.innerText()
    const expectedBalance = Number(initialBalance) - Number(mobileAmount)

    // Act
    await pulpitPage.topupReceiver.selectOption(mobileReceiver)
    await pulpitPage.topupAmount.fill(mobileAmount)
    // await page.locator('#uniform-widget_1_topup_agreement').click()  // alternatywa poniżej :)
    await pulpitPage.topupAgreement.check()
    await pulpitPage.topupExecuteButton.click()
    await pulpitPage.closeButton.click()

    // Assert
    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`)
  })
})
