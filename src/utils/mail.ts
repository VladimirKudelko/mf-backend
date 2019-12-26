import * as nodemailer from 'nodemailer';

export const sendMail = (subject: string, receiverEmail: string, html: string): void => {
  if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: process.env.EMAIL,
    subject: subject,
    to: receiverEmail,
    html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Email error: ', error.response);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
};

export const someContent = (firstName: string = '', email: string, hash: string): string => {
  const confirmUrl = `http://localhost:4200/verifyEmail?email=${email}&hash=${hash}`;

  return `
    <html>
      <head>
        <style>
        </style>
      </head>
      <body>
        <h1>Thanks ${firstName} for signing up!</h1>
        <p>
          Your account has been created, please confirm your email to use all the app's features.
          You can active your account by pressing the url below.
        </p>
        <a href='${confirmUrl}'>${confirmUrl}</a>
      </body>
    </html>
  `;
};
