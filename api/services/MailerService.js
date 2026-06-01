import nodemailer from "nodemailer";


async function createTransporterTest() {
    const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
  });

  return transporter;
}

async function sendMail({from = '"Teste" <teste@example.com>', subject, text, html, to}) {
  const transporter = await createTransporterTest();
  const mail = await transporter.sendMail({
    from: from,
    subject: subject,
    to: to,
    text: text,
    html: html
  });
  return mail;
}
const mailerService = {
  sendMail: sendMail
};

export {mailerService};