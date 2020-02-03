import * as http from 'http';
import * as socket from 'socket.io';
import * as TelegramBot from 'node-telegram-bot-api';

import app from './server';

const port = process.env.PORT || 3001;
const server = new http.Server(app);
const telegramBot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

export const io = socket(server, {
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

telegramBot.on('message', (message) => {
  const { chat: { id } } = message;

  telegramBot.sendMessage(id, 'Choose something: ', {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: '✅ Кнопка 1', callback_data: 'data 1' }],
        [{ text: '✅ Кнопка 2', callback_data: 'data 2' }],
        [{ text: '✅ Кнопка 3', callback_data: 'data 3' }]
      ]
    }) as any
  });
});

telegramBot.on('callback_query', (message) => {});

telegramBot.onText(/\/help/, (message, [source, match]) => {
  const { chat: { id } } = message;

  telegramBot.sendMessage(id, match);
});

io.on('connection', () => {
  io.emit('hello', { hello: 'hello' });
  console.log('New Socket Connection');
});

app.listen(port, () => console.log(`Server is starting on port - ${port}`));
