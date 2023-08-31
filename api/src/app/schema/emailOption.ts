// ~ DEBUG CONFIG ~ //
import { ContactForm } from '../type/contact';

const mailSignUp = (email: string, lastname: string, firstname: string, message: string) => {

  return {
    from: `"Bienvenu chez Wake up" ${process.env.NODEMAILER_ACCOUNT}`, // sender address
    to: `${email}`, // list of receivers
    subject: `Hello ${lastname}`, // Subject line
    text: "Hello world?", // plain text body
    html: `<b>Hello ${lastname} ${firstname}</b><br>${message}`, // html body
  }
}

const connectEmail = (data: ContactForm) => {
  return {
    from: `"Information de connection" ${process.env.NODEMAILER_ACCOUNT}`, // sender address
    to: `${data.email}`, // list of receivers
    subject: `Connexion à votre compte Wake up ${data.firstname} ${data.lastname}`, // Subject line
    text: "Hello world?", // plain text body
    html: '<b>Bonjour, </b><br> Vous venez de vous connecter sur notre plateforme <br> Si toutefois vous n&apos;etes pas a l&apos;origine de cette connection, veuillez nous contacter a cette adresse suivante : <br><a href="mailto:contact@wakeupbox.fr">contact@wakeupbox.fr</a>',
  }
}

const emailReceived = (data: ContactForm) => {

  return {
    from: `Wake up Clermont-Fd ${process.env.NODEMAILER_ACCOUNT}`, // sender address
    to: 'contact@wakeupbox.fr', // list of receivers
    subject: `Message de ${data.firstname} ${data.lastname}`, // Subject line
    html: `<body style="display: flex; flex-direction: column; font-family: roboto;">
    <br><div style="color: black; background-color: #e7e7e7; padding: 3rem; display: flex; flex-direction: column;">
    <h3>Vous avez un message de ${data.firstname} ${data.lastname}</h3>
    <p>Téléphone : ${data.phone}</p>
    <p>Email : ${data.email}</p>
    <p>Message : ${data.message}</p>
    <button type="button" value="Repondre" style="background-color: #0069d9; padding: 1.4rem;"><a href="mailto:${data.email}" style="color: white; padding: 1rem; text-align: center; text-decoration: none;" target="blank">Répondre</a></button>
    </div></body>`,
    replyTo: `${data.email}`
  }
}

const mailResetPassword = (email: string, OTP) => {
  return {
    from: `Wake up Clermont-Fd ${process.env.NODEMAILER_ACCOUNT}`, // sender address
    to: `${email}`, // list of receivers
    subject: `Réinitialisation mot de passe`, // Subject line
    html: `<body style="display: flex; flex-direction: column; font-family: roboto;">
    <br><div style="color: black; background-color: #e7e7e7; padding: 3rem; display: flex; flex-direction: column;">
    <h3>Vous avez effectué une demande de réinitialisation de mot de passe au de WAKE UP !</h3>
    <p>Si toutefois vous n'étiewz pas à l'origine de cette demande, merci de nous contacter par mail en cliquant <a href="mailto":contact@wakeupbox.fr>ici</a></p>
    <p>Sinon vous pouvez changer votre mot de passe en cliquant sur le lien suivant</p>
    <p><a href="https://wakeupclf.fr/reset" target="blank">Répondre</a></p>
    <button type="button" value="Repondre" style="background-color: #0069d9; padding: 1.4rem;"></button>
    </div></body>`,

  }
}


export { mailSignUp, connectEmail, emailReceived, mailResetPassword }