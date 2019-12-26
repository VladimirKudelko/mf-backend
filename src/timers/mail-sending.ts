import * as nodemailer from 'nodemailer';
import * as moment from 'moment';

import { authHelper, transactionHelper } from '../db/helpers';
import { RoleEnum } from '../enums';
import { TransactionDocument } from '../models';
import { MONTH_NAMES } from '../constants/month-names';

const createRow = (index: number, transaction: TransactionDocument) => `
  <tr ${index % 2 === 0 ? 'class="gray-row"' : ''}>
    <td>${index}</td>
    <td>${transaction.type}</td>
    <td>${transaction.amountMoney}$</td>
    <td>${transaction.note || ''}</td>
    <td>${moment(transaction.createdDate).format('MM-DD-YYYY')}</td>
  </tr>
`;

const createTable = (rows: string) => `
  <table>
    <tr>
        <th>№</td>
        <th>Transaction Type</td>
        <th>Amount Of Money</td>
        <th>Note</td>
        <th>Created Date</td>
    </tr>
    ${rows}
  </table>
`;

const createHtml = (table: string) => `
  <html>
    <head>
      <style>
        table {
          border: 1px solid black;
          border-collapse: collapse;
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          border: 1px solid black;
          padding: 15px;
        }
        .gray-row {
          background: #CCC
        }
        .title {
          text-align: center
        }
      </style>
    </head>
    <body>
      <h1 class="title">${MONTH_NAMES[new Date().getMonth()]}'s Report</h1>
      ${table}
    </body>
  </html>
`;

export const sendReportCallback = async() => {
  const now = new Date();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  if (
    lastDayOfMonth.getDate() !== now.getDate() ||
    !process.env.EMAIL ||
    !process.env.EMAIL_PASSWORD
  ) {
    return;
  }

  const users = await authHelper.getAll({ role: RoleEnum.User });
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: 'vladimir.kudelko1998@gmail.com',
    subject: `Month's expenses`,
  };

  for (const user of users) {
    const transactions = await transactionHelper.getByUserId(user._id);

    if (!transactions || !transactions.length) {
      continue;
    }

    const rows = transactions
      .map((transaction, index) => createRow(index, transaction))
      .join('');
    const table = createTable(rows);
    const html = createHtml(table);

    transporter.sendMail({ ...mailOptions, to: user.email, html }, (error, info) => {
      if (error) {
        console.log('Error: ', error.response);
      } else {
        console.log('Email sent: ', info.response);
      }
    });
  }
};
