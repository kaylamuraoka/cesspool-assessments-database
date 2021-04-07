const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

// Send mail
const sendEmail = (to, url, subject, name, buttonTxt, bodyTxt) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: `${subject}`,
    html: `
    <div style="max-width: 700px; margin:auto; border 10px solid #ddd; padding: 50px 20px; font-size: 110%; text-align: center">
    <h2 style="text-transform: uppercase; color: teal">Welcome to Cesspool Assessments</h2>
    <hr style="width: 600px" />
    <p style="text-transform: capitalize">Hi ${name}!</p>
  <p>${bodyTxt}</p>

  <a
    href="${url}"
    style="
      text-align: center;
      background: crimson;
      text-decoration: none;
      color: white;
      padding: 10px 20px;
      margin: 10px 0;
      display: inline-block;
    "
    >${buttonTxt}</a
  >

  <p>
    If the button doesn't work for any reason, you can also paste the following
    into your browser:
  </p>

  <div>${url}</div>

  <p>
    Note: You must perform this validation within the next 24 hours to keep your
    new account enabled.
  </p>

  <p>
    If you encounter any problem, please contact us at ${SENDER_EMAIL_ADDRESS}.
  </p>
</div>
    `,
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) return err;
    return info;
  });
};

module.exports = sendEmail;
