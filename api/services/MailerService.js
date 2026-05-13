import nodemailer from "nodemailer";


// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {

//   }
// });

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

export default createTransporterTest;