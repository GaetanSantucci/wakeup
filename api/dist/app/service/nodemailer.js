import nodemailer from 'nodemailer';
const sendEmail = (mailOptions) => {
    console.log('mailOptions: ', mailOptions);
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        // host: 'smtp.ionos.fr', // hostname
        // secure: true, //use SSL // TLS requires secureConnection to be false
        // host: 'smtp-mail.outlook.com',
        // port: 587, // hostname
        // secure: false, // hostname
        host: process.env.NODEMAILER_HOST,
        port: 465,
        secure: true,
        tls: {
            ciphers: 'SSLv3',
        },
        auth: {
            user: process.env.NODEMAILER_ACCOUNT,
            pass: process.env.NODEMAILER_PASSWORD
        },
    });
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error instanceof Error) {
            return console.log(`Erreur lors de la distribution du mail`, error);
        }
        else {
            console.log('Message sent: ' + info.response);
            return;
        }
    });
};
export { sendEmail };
