import { Locator, Page } from '@playwright/test'
import { SideMenuComponent } from '../components/side-menu.components'

export class PulpitPage {
  sideMenuComponent: SideMenuComponent
  transferReceiver: Locator
  transferAmount: Locator
  transferTitle: Locator
  executeButton: Locator
  closeButton: Locator
  messages: Locator
  topupReceiver: Locator
  topupAmount: Locator
  topupAgreement: Locator
  topupExecuteButton: Locator
  moneyValue: Locator
  userName: Locator

  constructor(private page: Page) {
    this.sideMenuComponent = new SideMenuComponent(this.page)

    this.transferReceiver = this.page.locator('#widget_1_transfer_receiver')
    this.transferAmount = this.page.locator('#widget_1_transfer_amount')
    this.transferTitle = this.page.locator('#widget_1_transfer_title')
    this.executeButton = this.page.locator('#execute_btn')
    this.closeButton = this.page.getByTestId('close-button')
    this.messages = this.page.locator('#show_messages')

    this.topupReceiver = this.page.locator('#widget_1_topup_receiver')
    this.topupAmount = this.page.locator('#widget_1_topup_amount')
    this.topupAgreement = this.page.locator('#uniform-widget_1_topup_agreement')
    this.topupExecuteButton = this.page.locator('#execute_phone_btn')

    this.moneyValue = this.page.locator('#money_value')
    this.userName = this.page.getByTestId('user-name')
  }

  async executeQuickPayment(TransferReceiver: string, TransferAmount: string, TransferTitle: string): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded') // wait for page to fully load:

    await this.transferReceiver.selectOption(TransferReceiver)
    await this.transferAmount.fill(TransferAmount)
    await this.transferTitle.fill(TransferTitle)

    await this.executeButton.click()
    await this.closeButton.click()
  }

  async executeMobileTopUp(mobileReceiver: string, mobileAmount: string): Promise<void> {
    await this.topupReceiver.selectOption(mobileReceiver)
    await this.topupAmount.fill(mobileAmount)

    // await page.locator('#uniform-widget_1_topup_agreement').click()  // alternatywa poniżej :)
    await this.topupAgreement.check()
    await this.topupExecuteButton.click()
    await this.closeButton.click()
  }
}
