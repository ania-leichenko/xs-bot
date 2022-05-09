import cron from 'node-cron';
import {
  ticket as ticketService,
  users as usersService,
} from '~/services/services';
import fetch from 'node-fetch';

const SUBSCRIPTION_HAS_EXPIRED =
  'Your subscription has expired. In order to continue using our signals, you need to pay for a subscription';

const task = cron.schedule('0 */1 * * * *', async () => {

  const tickets = await ticketService.getAllTickets();
  const admins = await usersService.getAllAdmins();
  for (const ticket of tickets) {
    for (const admin of admins) {
      if (
        new Date(ticket.subscriptionTime) < new Date() &&
        ticket.status === 'Active'
      ) {
        fetch(
          `https://api.telegram.org/bot5245583761:AAGViUQUROPfgNNSNLLRXK4_GPQ9nUZ3nVw/sendMessage?chat_id=${ticket.chatId}&text=${SUBSCRIPTION_HAS_EXPIRED}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          },
        );
        fetch(
          `https://api.telegram.org/bot5245583761:AAGViUQUROPfgNNSNLLRXK4_GPQ9nUZ3nVw/sendMessage?chat_id=${admin.chatId}&text=expired for ${admin.firstName}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          },
        );
        await ticketService.updateStatus(ticket.ticket);
      }
    }
  }
});

export { task };