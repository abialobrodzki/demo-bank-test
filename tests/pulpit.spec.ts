import { test, expect } from '@playwright/test'

test.describe('Pulpit tests', () => {
  test('quick payment with correct data', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/')
    await page.getByTestId('login-input').fill('TestTest')
    await page.getByTestId('password-input').fill('Test1234')
    await page.getByTestId('login-button').click()

    // wait for page to fully load:
    await page.waitForLoadState('domcontentloaded')

    await page.locator('#widget_1_transfer_receiver').selectOption('3')
    await page.locator('#widget_1_transfer_amount').fill('666')
    await page.locator('#widget_1_transfer_title').fill('Zwrot Środków')

    await page.locator('#execute_btn').click()
    await page.getByTestId('close-button').click()

    await expect(page.locator('#show_messages')).toHaveText(
      'Przelew wykonany! Michael Scott - 666,00PLN - Zwrot Środków',
    )
  })

  test('successful mobile top-up', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/')
    await page.getByTestId('login-input').fill('testtest')
    await page.getByTestId('password-input').fill('test1234')
    await page.getByTestId('login-button').click()
    await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx')
    await page.locator('#widget_1_topup_amount').fill('19')
    // await page.locator('#uniform-widget_1_topup_agreement').click()  // alternatywa poniżej :)
    await page.locator('#uniform-widget_1_topup_agreement').check()
    await page.locator('#execute_phone_btn').click()
    await page.getByTestId('close-button').click()

    await expect(page.locator('#show_messages')).toHaveText(
      'Doładowanie wykonane! 19,00PLN na numer 500 xxx xxx',
    )
  })
})
