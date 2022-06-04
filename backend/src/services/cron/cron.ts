import cron from 'node-cron';
import {
  ticket as ticketService,
  users as usersService,
} from '~/services/services';
import fetch from 'node-fetch';
import { ENV } from '~/common/enums/enums';
import { WARNING_ICON, CLOCK } from '~/common/enums/enums';

const task = cron.schedule('0 */1 * * * *', async () => {
  const tickets = await ticketService.getAllTickets();
  const admins = await usersService.getAllAdmins();
  for (const ticket of tickets) {
    const SUBSCRIPTION_HAS_EXPIRED = `${WARNING_ICON} <b>SYSTEM MESSAGE</b> ${WARNING_ICON}}%0AYour subscription for ${ticket.plan} has expired. In order to continue using our signals, you need to pay for a subscription&parse_mode=HTML`;
    if (
      new Date(ticket.subscriptionTime) < new Date() &&
      ticket.status === 'Active'
    ) {
      fetch(
        `https://api.telegram.org/bot${ENV.TELEGRAM_TOKEN}/sendMessage?chat_id=${ticket.chatId}&text=${SUBSCRIPTION_HAS_EXPIRED}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        },
      );
      for (const admin of admins) {
        fetch(
          `https://api.telegram.org/bot${ENV.TELEGRAM_TOKEN}/sendMessage?chat_id=${admin.chatId}&text=${CLOCK} Expired for ${ticket.firstName}, @${ticket.username}, ${ticket.plan}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          },
        );
        // eslint-disable-next-line no-console
        console.log(
          `Expired for ${ticket.firstName}, @${ticket.username}, ${ticket.plan}`,
        );
      }
      await ticketService.updateStatus(ticket.ticket);
    }
  }
});

export { task };
