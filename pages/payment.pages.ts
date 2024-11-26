import { Locator, Page } from '@playwright/test'

export class PaymentPage {
  transferReceiver: Locator
  formAccount: Locator
  formAmount: Locator
  acceptButton: Locator
  closeButton: Locator
  messages: Locator

  constructor(private page: Page) {
    this.transferReceiver = this.page.getByTestId('transfer_receiver')
    this.formAccount = this.page.getByTestId('form_account_to')
    this.formAmount = this.page.getByTestId('form_amount')
    this.acceptButton = this.page.getByRole('button', {name: 'wykonaj przelew'})
    this.closeButton = this.page.getByTestId('close-button')

    this.messages = this.page.locator('#show_messages')
  }
}
