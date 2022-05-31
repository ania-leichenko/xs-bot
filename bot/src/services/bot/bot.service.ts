/* eslint-disable no-console */
import { Context, Markup } from 'telegraf';
import {
  user as userServ,
  ticket as ticketServ,
  channel as channelServ,
} from '../services';
import {
  START_TEXT,
  FOREX_TEXT,
  COPY_SIGNALS_TEXT,
  BONUS_TEXT,
  USER_SUBCRITIONS,
  CRYPTO_TEXT,
  CRYPTO_BUTTON_TEXT,
  SKRILL_TEXT,
  BANK_CARD_TEXT,
  CONFIRM_PAYMENT_TEXT,
  FOREX_BUTTON_TITLE,
  BONUS_BUTTON_TITLE,
  PERSONAL_AREA_BUTTON_TITLE,
  CRYPTO_TITLE,
  CRYPTO_BUTTON_TITLE,
  COPY_SIGNALS_TITLE,
  SKRILL_TITLE,
  BANK_CARD_TITLE,
  CONFIRM_PAYMENT_TITLE,
  BACK,
  START_SCREEN,
  FOREX_SCREEN,
  CRYPTO_SCREEN,
  COPY_SIGNALS_SCREEN,
  BONUS_SCREEN,
  PERSONAL_AREA_SCREEN,
  PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX,
  PAYMENT_BY_SKRILL_SCREEN_OF_FOREX,
  PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX,
  PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO,
  PAYMENT_BY_SKRILL_SCREEN_OF_CRYPTO,
  PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO,
  CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX,
  CONFIRM_PAYMENT_BY_SKRILL_SCREEN_OF_FOREX,
  CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX,
  CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO,
  CONFIRM_PAYMENT_BY_SKRILL_SCREEN_OF_CRYPTO,
  CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO,
  PAYMENT_BY_CRYPTO_SCREEN_OF_COPY_SIGNALS,
  PAYMENT_BY_SKRILL_SCREEN_OF_COPY_SIGNALS,
  PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS,
  CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_COPY_SIGNALS,
  CONFIRM_PAYMENT_BY_SKRILL_SCREEN_OF_COPY_SIGNALS,
  PERSONAL_AREA_TITLE,
  TILL,
  POP_UP_TEXT,
  CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS,
  INSTRUCTION_FOR_BANK_CARD_TITLE,
  INSTRUCTION_FOR_BANK_CARD_SCREEN_OF_FOREX,
  INSTRUCTION_FOR_BANK_CARD_SCREEN_OF_CRYPTO,
  INSTRUCTION_FOR_BANK_CARD_SCREEN_OF_COPY_SIGNALS,
  // GIVEAWAY_SCREEN,
  // GIVEAWAY_TITLE,
  GIVEAWAY_POP_UP_TEXT,
} from '~/common/enums/enums';
import { Ticket as TicketEntity } from '~/services/ticket/ticket.entity';
import { Channel as ChannelEntity } from '~/services/channels/channel.entity';
import { formateDate } from '~/common/types/types';

type Constructor = {
  userService: typeof userServ;
  ticketService: typeof ticketServ;
  channelService: typeof channelServ;
};

type TButton = {
  id: string;
  title: string;
};
type TButtons = Array<TButton>;

class BotServ {
  #userService: typeof userServ;
  #ticketService: typeof ticketServ;
  #channelService: typeof channelServ;

  constructor({ userService, ticketService, channelService }: Constructor) {
    this.#userService = userService;
    this.#ticketService = ticketService;
    this.#channelService = channelService;
  }
  public async startBot(ctx: Context): Promise<void> {
    try {
      if (!ctx.from) {
        throw new Error('ctx.from is undefined');
      }
      const user = await this.#userService.getUserById(ctx.from.id);

      if (!user) {
        userServ.create({
          chatId: ctx.from.id,
          firstName: ctx.from.first_name,
          username: ctx.from.username,
          admin: 0,
          joined: new Date(),
          lastAction: new Date(),
        });
      }
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const user = await userServ.getUserById(e.on.payload.chat_id);
      console.log(`${user?.firstName} @${user?.username}  blocked bot`);
    }
  }

  public async createTicket(
    ctx: Context,
    {
      plan,
      paymentMethod,
      status,
    }: {
      plan: string;
      paymentMethod: string;
      status: string;
    },
  ): Promise<TicketEntity | undefined> {
    try {
      if (!ctx.from) {
        throw new Error('ctx.from is undefined');
      }

      const ticket = await this.#ticketService.create({
        chatId: ctx.from.id,
        firstName: ctx.from.first_name,
        username: ctx.from.username || '',
        subscriptionTime: new Date(),
        plan: plan,
        paymentMethod: paymentMethod,
        status: status,
        country: ctx.from.language_code || '',
      });

      const message = `<b>New Payment</b>

Ticket: ${ticket.ticket}
Username: @${ticket.username}
Telegram name: ${ticket.firstName}
Plan: ${ticket.plan}
Payment method: ${ticket.paymentMethod}
ID: ${ticket.chatId}
Country: ${ticket.country}`;
      this.sendMessageToAdmin(ctx, message);
      return ticket;
    } catch (e) {
      console.log(e);
    }
  }

  public async sendMessageToAdmin(
    ctx: Context,
    message: string,
  ): Promise<void> {
    try {
      const admins = await this.#userService.getAllAdmins();
      admins.map((admin): void => {
        ctx.telegram.sendMessage(admin.chatId, message, {
          parse_mode: 'HTML',
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  public async getChannel(ctx: Context): Promise<ChannelEntity> {
    if (!ctx) {
      throw new Error('ctx is undefined');
    }
    if (!ctx.channelPost) {
      throw new Error('ctx.channelPost is undefined');
    }
    if (!ctx.channelPost.sender_chat) {
      throw new Error('ctx.channelPost.sender_chat is undefined');
    }
    const channel = await this.#channelService.getChannelById(
      ctx.channelPost.sender_chat.id,
    );
    if (!channel) {
      throw new Error('channel is udefined');
    }
    return channel;
  }

  public async startScreen(ctx: Context): Promise<void> {
    try {
      this.renderScreen(ctx, {
        html: START_TEXT,
        buttons: [
          // [{ title: GIVEAWAY_TITLE, id: GIVEAWAY_SCREEN }],
          [{ title: FOREX_BUTTON_TITLE, id: FOREX_SCREEN }],
          [{ title: CRYPTO_BUTTON_TITLE, id: CRYPTO_SCREEN }],
          [{ title: COPY_SIGNALS_TITLE, id: COPY_SIGNALS_SCREEN }],
          [{ title: BONUS_BUTTON_TITLE, id: BONUS_SCREEN }],
          [{ title: PERSONAL_AREA_BUTTON_TITLE, id: PERSONAL_AREA_SCREEN }],
        ],
      });
    } catch (e) {
      console.log(e);
    }
  }

  public renderScreen(
    ctx: Context,
    options: {
      html: string;
      buttons: TButtons[];
    },
  ): void {
    try {
      if (!options.buttons) {
        return;
      }
      ctx.replyWithHTML(
        options.html,
        Markup.inlineKeyboard(
          options.buttons.map((arr) => {
            return arr.map((button) =>
              Markup.button.callback(button.title, button.id),
            );
          }),
        ),
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async forexScreen(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${FOREX_TEXT}`,
        buttons: [
          [{ title: CRYPTO_TITLE, id: PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX }],
          [{ title: SKRILL_TITLE, id: PAYMENT_BY_SKRILL_SCREEN_OF_FOREX }],
          [
            {
              title: BANK_CARD_TITLE,
              id: PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX,
            },
          ],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async cryptoScreen(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${CRYPTO_BUTTON_TEXT}`,
        buttons: [
          [{ title: CRYPTO_TITLE, id: PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO }],
          [{ title: SKRILL_TITLE, id: PAYMENT_BY_SKRILL_SCREEN_OF_CRYPTO }],
          [
            {
              title: BANK_CARD_TITLE,
              id: PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO,
            },
          ],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async popUpScreen(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${POP_UP_TEXT}`,
        buttons: [
          [{ title: PERSONAL_AREA_BUTTON_TITLE, id: PERSONAL_AREA_SCREEN }],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async popUpGiveAwayScreen(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${GIVEAWAY_POP_UP_TEXT}`,
        buttons: [
          [{ title: PERSONAL_AREA_BUTTON_TITLE, id: PERSONAL_AREA_SCREEN }],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async copySignalsScreen(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${COPY_SIGNALS_TEXT}`,
        buttons: [
          [
            {
              title: CRYPTO_TITLE,
              id: PAYMENT_BY_CRYPTO_SCREEN_OF_COPY_SIGNALS,
            },
          ],
          [
            {
              title: SKRILL_TITLE,
              id: PAYMENT_BY_SKRILL_SCREEN_OF_COPY_SIGNALS,
            },
          ],
          [
            {
              title: BANK_CARD_TITLE,
              id: PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS,
            },
          ],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async bonusScreen(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${BONUS_TEXT}`,
        buttons: [[{ title: BACK, id: START_SCREEN }]],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async personalAreaScreen(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      if (!ctx.from) {
        throw new Error('ctx.from is undefined');
      }
      if (!ctx.chat) {
        throw new Error('ctx.chat is undefined');
      }
      const tickets = await this.#ticketService.getTicketByPlan(ctx.from.id);
      const user = await this.#userService.getUserById(ctx.chat.id);
      let html = '';
      if (tickets.length === 0) {
        html += 'no active subscription';
      }
      tickets.map((ticket) => {
        if (
          ticket.subscriptionTime > new Date() &&
          ticket.status === 'Active'
        ) {
          const subscriptionDate = new Date(ticket.subscriptionTime);
          let subscriptionTime = formateDate(String(ticket.subscriptionTime));
          if (subscriptionDate.getFullYear() === 5000) {
            subscriptionTime = 'Lifetime';
          }
          let level = '';
          if (
            user?.countOfSubscription === 0 ||
            user?.countOfSubscription === 1
          ) {
            level = 'None';
          }
          if (
            user?.countOfSubscription === 2 ||
            user?.countOfSubscription === 3
          ) {
            level = 'Bronze 🥉';
          }
          if (
            user?.countOfSubscription === 4 ||
            user?.countOfSubscription === 5
          ) {
            level = 'Silver 🥈';
          }
          if (
            user?.countOfSubscription === 6 ||
            user?.countOfSubscription === 7 ||
            user?.countOfSubscription === 8 ||
            user?.countOfSubscription === 9 ||
            user?.countOfSubscription === 10 ||
            user?.countOfSubscription === 11
          ) {
            level = 'Gold 🥇';
          }
          if (user?.countOfSubscription === 12) {
            level = 'Platinum 💎';
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          html += `
<b>Plan:</b> ${ticket.plan}
<b>Status:</b> Your subscription active
${TILL} ${subscriptionTime}

<b>Bonus level:</b> ${level}

`;
        }
        if (ticket.status === 'Pending') {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          html += `<b>Plan:</b> ${ticket.plan}
<b>Status:</b> Wait for subscription confirmation.
${TILL} -

`;
        }
      });
      this.renderScreen(ctx, {
        html: `${PERSONAL_AREA_TITLE}

${USER_SUBCRITIONS}
${html}
<i>*Add the number 1 to the month so that iption is displayed correctly. We are working on fixing this error. The problem is on the telegram side.</i>`,
        buttons: [[{ title: BACK, id: START_SCREEN }]],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async mainScreen(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.startScreen(ctx);
    } catch (e) {
      console.error(e);
    }
  }

  public async paymentByCryptoScreenOfForex(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${CRYPTO_TEXT}`,
        buttons: [
          [
            {
              title: CONFIRM_PAYMENT_TITLE,
              id: CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX,
            },
          ],
          [{ title: BACK, id: FOREX_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async paymentByScreenOfForex(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${SKRILL_TEXT}`,
        buttons: [
          [
            {
              title: CONFIRM_PAYMENT_TITLE,
              id: CONFIRM_PAYMENT_BY_SKRILL_SCREEN_OF_FOREX,
            },
          ],
          [{ title: BACK, id: FOREX_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async paymentByBankCardScreenOfForex(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${BANK_CARD_TEXT}`,
        buttons: [
          [
            {
              title: CONFIRM_PAYMENT_TITLE,
              id: CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX,
            },
          ],
          [
            {
              title: INSTRUCTION_FOR_BANK_CARD_TITLE,
              id: INSTRUCTION_FOR_BANK_CARD_SCREEN_OF_FOREX,
            },
          ],
          [{ title: BACK, id: FOREX_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentByCryptoScreenOfForex(
    ctx: Context,
  ): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [
          [{ title: PERSONAL_AREA_BUTTON_TITLE, id: PERSONAL_AREA_SCREEN }],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentBySkrillScreenOfForex(
    ctx: Context,
  ): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [
          [{ title: PERSONAL_AREA_BUTTON_TITLE, id: PERSONAL_AREA_SCREEN }],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentByBankCardScreenOfForex(
    ctx: Context,
  ): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [
          [{ title: PERSONAL_AREA_BUTTON_TITLE, id: PERSONAL_AREA_SCREEN }],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async paymentByCryptoScreenOfCrypto(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${CRYPTO_TEXT}`,
        buttons: [
          [
            {
              title: CONFIRM_PAYMENT_TITLE,
              id: CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO,
            },
          ],
          [{ title: BACK, id: CRYPTO_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async paymentByScreenOfCrypto(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${SKRILL_TEXT}`,
        buttons: [
          [
            {
              title: CONFIRM_PAYMENT_TITLE,
              id: CONFIRM_PAYMENT_BY_SKRILL_SCREEN_OF_CRYPTO,
            },
          ],
          [{ title: BACK, id: CRYPTO_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async paymentByBankCardScreenOfCrypto(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${BANK_CARD_TEXT}`,
        buttons: [
          [
            {
              title: CONFIRM_PAYMENT_TITLE,
              id: CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO,
            },
          ],
          [
            {
              title: INSTRUCTION_FOR_BANK_CARD_TITLE,
              id: INSTRUCTION_FOR_BANK_CARD_SCREEN_OF_CRYPTO,
            },
          ],
          [{ title: BACK, id: CRYPTO_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentByCryptoScreenOfCrypto(
    ctx: Context,
  ): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [
          [{ title: PERSONAL_AREA_BUTTON_TITLE, id: PERSONAL_AREA_SCREEN }],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentBySkrillScreenOfCrypto(
    ctx: Context,
  ): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [
          [{ title: PERSONAL_AREA_BUTTON_TITLE, id: PERSONAL_AREA_SCREEN }],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentByBankCardScreenOfCrypto(
    ctx: Context,
  ): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [
          [{ title: PERSONAL_AREA_BUTTON_TITLE, id: PERSONAL_AREA_SCREEN }],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async paymentByCryptoOfCopySignals(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${CRYPTO_TEXT}`,
        buttons: [
          [
            {
              title: CONFIRM_PAYMENT_TITLE,
              id: CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_COPY_SIGNALS,
            },
          ],
          [{ title: BACK, id: COPY_SIGNALS_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async paymentBySkrillOfCopySignals(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${SKRILL_TEXT}`,
        buttons: [
          [
            {
              title: CONFIRM_PAYMENT_TITLE,
              id: CONFIRM_PAYMENT_BY_SKRILL_SCREEN_OF_COPY_SIGNALS,
            },
          ],
          [{ title: BACK, id: COPY_SIGNALS_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async paymentByBankCardOfCopySignals(ctx: Context): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${BANK_CARD_TEXT}`,
        buttons: [
          [
            {
              title: CONFIRM_PAYMENT_TITLE,
              id: CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS,
            },
          ],
          [
            {
              title: INSTRUCTION_FOR_BANK_CARD_TITLE,
              id: INSTRUCTION_FOR_BANK_CARD_SCREEN_OF_COPY_SIGNALS,
            },
          ],
          [{ title: BACK, id: COPY_SIGNALS_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentByCryptoScreenOfCopySignals(
    ctx: Context,
  ): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [
          [{ title: PERSONAL_AREA_BUTTON_TITLE, id: PERSONAL_AREA_SCREEN }],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentByScillScreenOfCopySignals(
    ctx: Context,
  ): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [
          [{ title: PERSONAL_AREA_BUTTON_TITLE, id: PERSONAL_AREA_SCREEN }],
          [
            {
              title: BACK,
              id: START_SCREEN,
            },
          ],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentByBankCardScreenOfCopySignals(
    ctx: Context,
  ): Promise<void> {
    try {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }
      await this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [
          [{ title: PERSONAL_AREA_BUTTON_TITLE, id: PERSONAL_AREA_SCREEN }],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export { BotServ };
