// ~ DEBUG CONFIG ~ //
import { ContactForm } from '../type/contact';

const mailSignUp = (lastname: string, firstname: string, message: string) => {

  return {
    from: `"Bienvenu chez Wake up" ${process.env.NODEMAILER_ACCOUNT}`, // sender address
    to: "gaetan.santucci@outlook.com", // list of receivers
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

  const mailList = [
    'contact@wakeupbox.fr',
    'gaetan.santucci@outlook.com'
  ]

  return {
    from: `Wake up Clermont-Fd ${process.env.NODEMAILER_ACCOUNT}`, // sender address
    to: mailList, // list of receivers
    subject: `Demande de renseignements`, // Subject line
    // text: `Hello world? ${data.lastname}`, // plain text body
    html: `<body style="display: flex; flex-direction: column; font-family: roboto;">
    <br><div style="color: black; background-color: #e7e7e7; padding: 3rem; display: flex; flex-direction: column;">
    <h3>Vous avez un message de ${data.firstname} ${data.lastname}</h3>
    <p>Téléphone : ${data.phone}</p>
    <p>Email : ${data.email}</p>
    <p>Message : ${data.message}</p>
    <button type="button" value="Repondre" style="background-color: #0069d9;"><a href="mailto:${data.email}" style="color: white; padding: 1rem; text-align: center; text-decoration: none;" target="blank">Répondre</a></button>
    </div></body>`
  }
}

// <a href='mailto:${data.email}><button type="button">Repondre</button></a>

export { mailSignUp, connectEmail, emailReceived }