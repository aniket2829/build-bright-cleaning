/*
 * Proves the Gmail SMTP credentials before trusting the form to them.
 *
 *   npm run mail:check          verify the login only, sends nothing
 *   npm run mail:check -- --send   also send one test message to QUOTE_INBOX
 *
 * Reads .env.local through node's own --env-file (see package.json), so it
 * needs no extra dependency and no Next.js runtime.
 */
import nodemailer from "nodemailer";

const user = process.env.SMTP_USER?.trim();
const pass = process.env.SMTP_PASSWORD?.trim();
const inbox = process.env.QUOTE_INBOX?.trim() || user;

const missing = [!user && "SMTP_USER", !pass && "SMTP_PASSWORD"].filter(Boolean);
if (missing.length) {
  console.error(`✗ Missing ${missing.join(" and ")} in .env.local`);
  console.error("  See .env.example. SMTP_PASSWORD is a 16-character Google App Password,");
  console.error("  not the account password, and 2-Step Verification must be on.");
  process.exit(1);
}

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user, pass },
});

try {
  await transport.verify();
  console.log(`✓ Gmail SMTP accepted ${user}`);
} catch (error) {
  console.error(`✗ Gmail rejected the connection: ${error.message}`);
  if (String(error.message).includes("Username and Password not accepted")) {
    console.error("  That usually means an account password was used instead of an App Password,");
    console.error("  or 2-Step Verification is not switched on for the account.");
  }
  process.exit(1);
}

if (process.argv.includes("--send")) {
  const info = await transport.sendMail({
    to: inbox,
    from: `"Build Bright Cleaning website" <${user}>`,
    subject: "Test — quote form is wired up",
    text: "If you are reading this, the site can reach this inbox. Nothing else to do.",
  });
  console.log(`✓ Test message sent to ${inbox} (${info.messageId})`);
} else {
  console.log("  Login verified; nothing sent. Re-run with -- --send to post a test message.");
}
