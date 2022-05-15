import {
  SEE_BUTTONS,
  QUESSION_ICON,
  CHECKED_ICON,
  SERVICE_INACTIVE_ICON,
  BLACK_SQUARE_ICON,
} from './emoji.enum';
import {
  FOREX_TITLE,
  FAQ_TITLE,
  PERSONAL_AREA_TITLE,
  CRYPTO_TITLE,
  SKRILL_TITLE,
  SWIFT_TITLE,
  BANK_CARD_TITLE,
} from './title.enum';

export const MESSAGE_FROM_BOT_TO_USER = `We have received your payment.

Within a few hours, the system will check the authenticity of the payment and give you access. If for some reason you did not get access, contact the administrator @bestsignalsadmin

Track your subscription status in personal area`;
export const START_TEXT = `In order to become a member of premium signals, you need to choose which subscription you need.Daily receipt of 5 to 10 signals!

By purchasing our signals, you get access to trading strategies that are a guaranteed guarantee of your success! If our signals do not bring you profit, we will return the funds!

Choose from the list below ${SEE_BUTTONS}`;
export const FOREX_TEXT = `<b>${FOREX_TITLE}</b>

Get signals with a return of more than 95%. Signals for the forex market, gold and indices. During the day, 5-10 signals come, and the stop loss does not exceed the profit.The most successful signals for gold, more than 1000 pips per month. In just a month, the goal of 3000 points will always be reached.`;
export const COPY_SIGNALS_TEXT = `<b>Copy Signals</b>

Copy signals to your trading account with a delay of 0.00001ms! Trades with take profit and stop loss will be copied to your account, and if the trade is closed in the bot, it will be automatically closed on your account as well.`;
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

Get signals for the spot and futures market of cryptocurrencies. Transactions can be both short-term and long-term. When a signal is published, you will receive stop loss and take profit, as well as the trading leverage and the size of the deposit at which you need to enter the deal. The risk per trade is no more than 2%. High volatility instants`;
export const CRYPTO_TEXT = `<b>${CRYPTO_TITLE}</b>

${BLACK_SQUARE_ICON} Wallet: USDT
Address: TPXqExfPbXBWjum98PsHuJ916b9EkQKPN2
Network: TRC20

${BLACK_SQUARE_ICON} Wallet: BTC
Address: 0x520a98177b6e6cb286c3fc1b19a719daea2b6cf2
Network: Binance Smart Chain

${BLACK_SQUARE_ICON} Wallet: BTC
Address: 14R9wSycdWe4GTPVy3qG4d2ih8MZH9W4et
Network: Bitcoin

${BLACK_SQUARE_ICON} Wallet: BTC
Address: bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23
Network: Binance Chain (BEP2)
MEMO: 364451047

${BLACK_SQUARE_ICON} Binance pay
ID: 383468420
No fee.

<b>Send an amount that covers the commission!</b>

${SERVICE_INACTIVE_ICON} After you make payment, click on the button below ${SEE_BUTTONS}`;
export const SKRILL_TEXT = `<b>${SKRILL_TITLE}</b>

Send to my mail -> sergeisemenovfx@gmail.com

${SERVICE_INACTIVE_ICON} Send an amount over 8% than the subscription amount, otherwise the commission will not be covered and the system will not count the payment ${SERVICE_INACTIVE_ICON}`;
export const SWIFT_TEXT = `<b>${SWIFT_TITLE}</b>

You can transfer funds to us using the swift method, but the minimum amount is $600 (payment for half a year in advance). It also depends on your bank and what fees it takes for the transfer. You may have to pay another 50-100 dollars for commissions.

To make a payment, contact the administrator @BestSignalsAdmin`;
export const BANK_CARD_TEXT = `<b>${BANK_CARD_TITLE}</b>

To make a payment, contact the administrator @BestSignalsAdmin`;
export const CONFIRM_PAYMENT_TEXT = `We have received your payment.

Within a few hours, the system will check the authenticity of the payment and give you access. If for some reason you did not get access, contact the administrator @bestsignalsadmin

<b>Track your subscription status in personal area</b>`;
export const POP_UP_TEXT =
  'You have already paid. Track information in personal area';
