import nodemailer from "nodemailer";
import { EmailTemplate } from "src/interfaces/chiefWarden";
//
// Send mail to students
// Module: Nodemailer
//

export const sendMail = ({
  subject,
  body,
  email,
}: {
  subject: string;
  body: string;
  email: string;
}) => {
  // Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.TRANSPORTER_USERNAME,
      pass: process.env.TRANSPORTER_PASSWORD,
    },
  });

  // Mail options
  const mailOptions = {
    from: process.env.TRANSPORTER_USERNAME,
    to: email,
    subject: subject,
    html: body,
  };

  // Send mail
  return transporter.sendMail(mailOptions);
};

// Templates for mails
export const presetMailTemplates = {
  newAdmission({ name, email }: { name: string; email: string }, roomCode: string): EmailTemplate {
    return {
      email,
      subject: "Congratulations! You have been admitted to School Hostel",
      body: `Greetings of the day, ${name},<br/>
      Welcome to the hostel, The chief warden has verified your details and has alloted you to the hostel.
      <br/>
      <h4>Room No: ${roomCode}</h4>
      <h4>Please login to your account on the hostel portal using <b>${email}</b>.</h4>
      <p>Best regards,<br/>
      Chief Warden</p>`,
    };
  },
  roomUpdated({ name, email }: { name: string; email: string }, roomCode: string): EmailTemplate {
    return {
      email,
      subject: "Your room has been changed | School Hostel",
      body: `Greetings of the day, ${name},<br/>
      Your Room has been changed. Please move to the following room with your belongings.
      <h4>Room No: ${roomCode}</h4>
      <h4>Incase of any enquiry, Please login to your account on the hostel portal using <b>${email}</b>.</h4>
      <p>Best regards,<br/>
      Chief Warden</p>`,
    };
  },
  rejectedAdmission({ name, email }: { name: string; email: string }): EmailTemplate {
    return {
      email,
      subject: `Admission request rejected | School Hostel`,
      body: `Greetings of the day, ${name},<br/>
      We are sorry to inform that your request for accomodation in the school hostel has been rejected.
      <h4>Incase of any enquiry, Please get in touch with chief warden on hostel portal.</h4>
      <p>Best regards,<br/>
      Chief Warden</p>`,
    };
  },
  departedStudent({ name, email }: { name: string; email: string }): EmailTemplate {
    return {
      email,
      subject: `Departing request approved | School Hostel`,
      body: `Greetings of the day, ${name},<br/>
        The chief warden has approved your request for departing from the hostel. Please take all your belongings and report to warden.
        <br/> You can no longer login in the school hostel portal.
        <h4>Incase of any enquiry, Please get in touch with chief warden on hostel portal.</h4>
        <p>Best regards,<br/>
        Chief Warden</p>`,
    };
  },
};