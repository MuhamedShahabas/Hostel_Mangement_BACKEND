import { config } from "dotenv";
// Configuring dotenv
config();
import nodemailer from "nodemailer";
import { EmailTemplate } from "../interfaces/chiefWarden";
import { monthsArray } from "./OtherData";

//
// Send mail to users
// Module: Nodemailer
// Trasnporter Service: SendGrid
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
    service: "SendGrid",
    auth: {
      user: process.env.TRANSPORTER_APIKEY,
      pass: process.env.TRANSPORTER_PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
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
  newComplaint(email: string, complaintID: string): EmailTemplate {
    return {
      email,
      subject: "Complaint raised Successfully | School Hostel",
      body: `Greetings of the day,<br/>
      Your complaint has been registered successfully.
      <h4>Complaint ID: ${complaintID}</h4>
      Login to hostel portal to view all details.
      <br/>
      <p>Best regards,<br/>
      Chief Warden</p>`,
    };
  },
  complaintUpdate(
    email: string,
    complaintID: string,
    status: string,
    staff: { email: string; name: string }
  ): EmailTemplate {
    return {
      email,
      subject: `Update on Complaint : ${complaintID} | School Hostel`,
      body: `Greetings of the day,<br/>
      There has been an update on your complaint.
      <h4>Complaint ID: ${complaintID}</h4>
      <h4>Status: ${status.toUpperCase()}</h4>
      <h4>Staff: ${staff.name} ( ${staff.email} )</h4>
      Login to hostel portal to view all details.
      <br/>
      <p>Best regards,<br/>
      Chief Warden</p>`,
    };
  },
  newNotice(email: string, title: string, message: string): EmailTemplate {
    return {
      email,
      subject: `New Notice | School Hostel`,
      body: `Greetings of the day,<br/>
      <h4>Title: ${title}</h4>
      <b><u>Message</u></b>
      <br/>
      ${message}     
      <br/>
      <br/>
      Login to hostel portal to view all details.
      <br/>
      <p>Best regards,<br/>
      Chief Warden</p>`,
    };
  },
  monthlyPayment(email: string, bill: number, pendingAmount: number): EmailTemplate {
    return {
      email,
      subject: `Hostel fees for ${
        monthsArray[new Date().getMonth()]
      } ${new Date().getFullYear()} | School Hostel`,
      body: `Greetings of the day,<br/>
      <b>Your hostel bill for this month has been generated. Current pending amount to be paid for the hostel is ${pendingAmount}</b>
      <h4>Bill amount: ${bill - pendingAmount}</h4>
      <h4>Pending Payment: ${bill}</h4>
      <br/>    
      Make sure you pay the bill within next week.
      <br/>
      Login to hostel portal to view all details.
      <br/>
      <p>Best regards,<br/>
      Chief Warden</p>`,
    };
  },
  newStaff(email: string, name: string, role: string,password: string): EmailTemplate {
    return {
      email,
      subject: `Welcome, ${name} | School Hostel`,
      body: `Greetings of the day,<br/>
      <b>Hi, ${name}</b>
      <br/>
      <p>Welcome to the School Hostel, </p>
      <br/>
      <p>You will the joining the ${role} team from today onwards.</p>
      <h4>Email: ${email}</h4>
      <h4>Password: ${password}</h4>
      <br/>    
      Please make sure you login to the school hostel portal and change your current password in the profile tab.
      <br/>
      <p>Best regards,<br/>
      Chief Warden</p>`,
    };
  },
};
