import {
  SEE_BUTTONS,
  QUESSION_ICON,
  CHECKED_ICON,
  SERVICE_INACTIVE_ICON,
  BLACK_SQUARE_ICON,
  AHTUNG_ICON,
  SMILING_FACE_ICON,
} from './emoji.enum';
import {
  FOREX_TITLE,
  FAQ_TITLE,
  PERSONAL_AREA_TITLE,
  CRYPTO_TITLE,
  SKRILL_TITLE,
  BANK_CARD_TITLE,
} from './title.enum';

export const MESSAGE_FROM_BOT_TO_USER = `We have received your payment.

Within a few hours, the system will check the authenticity of the payment and give you access. If for some reason you did not get access, contact the administrator @bestsignalsadmin

Track your subscription status in personal area`;
export const START_TEXT = `Hello! In order to become a member of premium signals, you need to choose which subscription you need.

Why should you use our signals?
${CHECKED_ICON} Get access to trading strategies that are a guaranteed guarantee of your success.
${CHECKED_ICON} Our team has over 5 years of experience in trading.
${CHECKED_ICON} We take risk. We will never empty your deposit.
${CHECKED_ICON} We are market makers, we see more than you. With us you can earn.

${AHTUNG_ICON} <b>If our signals do not bring you profit, we will return the funds!</b>

Select the subscription you need from the list below ${SEE_BUTTONS}`;
export const FOREX_TEXT = `<b>${FOREX_TITLE}</b>

Get signals with a profitability of more than 95% per month.

Signals for:
${BLACK_SQUARE_ICON} Forex market
${BLACK_SQUARE_ICON} XAU/USD
${BLACK_SQUARE_ICON} Stock market

During the day, 5-10 signals come, and the stop loss does not exceed the profit. The most successful signals for gold, more than 1000 pips per month.

<b>In just a month, the goal of 3000 pips will always be reached.</b>

Choose the most convenient payment method for you and get a subscription within a minute after payment ${SEE_BUTTONS}`;
export const COPY_SIGNALS_TEXT = `<b>Copy signals</b>

Copy our signals to your trading account from bot with a delay of 0.1ms!

What is included in setting up signal copying?
${BLACK_SQUARE_ICON} Setting up a trading lot
${BLACK_SQUARE_ICON} Enable or disable copying of individual currencies
${BLACK_SQUARE_ICON} Copying signals with take profit and stop loss
${BLACK_SQUARE_ICON} If the deal was closed in the bot, the deal is closed automatically on the account. If we close half lot of the deal in the bot, this is also will be closed half lot on your trading account

Choose the most convenient payment method for you and get a subscription within a minute after payment ${SEE_BUTTONS}`;
export const FAQ_TEXT = `<b>${FAQ_TITLE}</b>

${QUESSION_ICON} Can I be sure of the authenticity of Premium Signals? Can I get free access for one day to try them out?
${CHECKED_ICON}  All free signals are updated daily in the free channel. You can test free signals at any time.

${QUESSION_ICON}  I want to get a test signal to make sure they work.
${CHECKED_ICON} Follow a free channel that provides free signals daily.

${QUESSION_ICON}  I have no experience in this area, can I start trading with your signals?
${CHECKED_ICON} We provide access signals to save you time on learning all the nuances. Experts are always in touch and are ready to provide detailed instructions for opening trades based on signals. For any questions, you can contact the administrator in the chat.

${QUESSION_ICON}  What should I do if I fail to open trades?
${CHECKED_ICON} All our instructions and training are directly aimed at your guaranteed result, and you can always contact the administrator for any questions.

If you have any questions, please contact the administrator ?@bestsignalsadmin (Due to the extensive amount of work, the administrator's response may take some time.)`;
export const PERSONAL_AREA_TEXT = `${PERSONAL_AREA_TITLE}

`;
export const CRYPTO_BUTTON_TEXT = `<b>Crypto</b>

Get signals for the spot and futures market of cryptocurrencies. Deals can be both short-term and long-term.

Signals for:
${BLACK_SQUARE_ICON} Futures (170 coins)
${BLACK_SQUARE_ICON} Spot (250+ coins)

When a signal is published, you will receive stop loss and take profit, as well as the trading leverage and the size of the deposit at which you need to enter the deal. The risk per trade is no more than 2%. High volatility instants

Choose the most convenient payment method for you and get a subscription within a minute after payment ${SEE_BUTTONS}`;
export const CRYPTO_TEXT = `<b>${CRYPTO_TITLE}</b>

${BLACK_SQUARE_ICON} Wallet: USDT
Address: <code>TPXqExfPbXBWjum98PsHuJ916b9EkQKPN2</code>
Network: TRC20 (TRX)

${BLACK_SQUARE_ICON} Wallet: BTC
Address: <code>0x520a98177b6e6cb286c3fc1b19a719daea2b6cf2</code>
Network: Binance Smart Chain (BEP20)

${BLACK_SQUARE_ICON} Wallet: BTC
Address: <code>14R9wSycdWe4GTPVy3qG4d2ih8MZH9W4et</code>
Network: Bitcoin

${BLACK_SQUARE_ICON} Wallet: BTC
Address: <code>bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23</code>
Network: BNB Beacon Chain (BEP2)
MEMO: 364451047

${BLACK_SQUARE_ICON} ETH
Address: <code>0x520a98177b6e6cb286c3fc1b19a719daea2b6cf2</code>
Network: ETH (ERC20)

${BLACK_SQUARE_ICON} BNB
Address: <code>0x520a98177b6e6cb286c3fc1b19a719daea2b6cf2</code>
Network: BSC (BNB Smart Chain) (BEP20)

${BLACK_SQUARE_ICON} LTC
Address: <code>LU565cxgwFkaHsentg2ubMdWFW3KDb9wyd</code>
Network: LTC

${BLACK_SQUARE_ICON} Binance pay
ID: <code>383468420</code>
No fee.

<b>Send an amount that covers the commission! Otherwise, the bot will not automatically give you a subscription</b>

${SERVICE_INACTIVE_ICON} After you make payment, click on the button below ${SEE_BUTTONS}`;
export const SKRILL_TEXT = `<b>${SKRILL_TITLE}</b>

Email: sergeisemenovfx@gmail.com
ID: 144096465

<b>Send an amount over 8% than the subscription amount, otherwise the commission will not be covered and the system will not count the payment</b>

${SERVICE_INACTIVE_ICON} After you make payment, click on the button below ${SEE_BUTTONS}`;

export const BANK_CARD_TEXT = `<b>${BANK_CARD_TITLE}</b>

You can pay for the subscription with your card, paying only $3 commission.

How to pay:
${BLACK_SQUARE_ICON} Register on wise.com
${BLACK_SQUARE_ICON} Make payment to my details, not to the account of the site! (Write to @bestsignalsadmin for details)
${BLACK_SQUARE_ICON} Be sure to include my email

<b>Click on the "Instructions" button below to read the payment instructions</b>

${SERVICE_INACTIVE_ICON} After you make payment, click on the button below ${SEE_BUTTONS}`;
export const CONFIRM_PAYMENT_TEXT = `We have received your payment! ${CHECKED_ICON}

Within a few hours, the system will check the authenticity of the payment and give you access. If for some reason you did not get access, contact the administrator @bestsignalsadmin

<b>Track your subscription status in personal area ${SEE_BUTTONS}</b>`;
export const POP_UP_TEXT ='You have already paid. Track information in personal area';
export const GIVEAWAY_TEXT=`${CHECKED_ICON} You are registered in the giveaway! Expect results. The result will come to this bot, with the same message`;
export const GIVEAWAY_POP_UP_TEXT=`You are already registered in the contest. Expect results. ${SMILING_FACE_ICON}`;
