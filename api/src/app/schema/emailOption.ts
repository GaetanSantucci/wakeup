// ~ DEBUG CONFIG ~ //
import { ContactForm } from '../type/contact'
import { OrderBody } from '../type/order'

const mailSignUp = (email: string) => {
  return {
    from: `"Bienvenue chez Wake up" ${process.env.NODEMAILER_ACCOUNT}`, // sender address
    to: `${email}`, // list of receivers
    subject: `Bienvenue chez WAKE UP`, // Subject line
    html: `
      <div style="background-color: #f2f2f2; padding: 20px;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
          <p style="font-size: 16px; margin-bottom: 20px;">Nous sommes ravis de vous accueillir chez Wake up. Vous pouvez désormais accéder à votre compte et consulter vos réservations</p>
          <p style="font-size: 16px; margin-bottom: 20px;">N'hésitez pas à nous contacter si vous avez des questions ou des commentaires. Nous sommes là pour vous aider !</p>
          <a href="https://www.wakeupclf.fr" style="background-color: #0069d9; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px;">Découvrir Wake up</a>
        </div>
        <p style="font-size: 8px;">Vous pouvez vous désabonner de nos emails en cliquant sur ce lien : <a href="http://${process.env.CLIENT_URL}/unsubscribe">Se désabonner</a></p>
      </div>
    `,
  }
}

const connectEmail = (data: ContactForm) => {
  return {
    from: `"Information de connection" ${process.env.NODEMAILER_ACCOUNT}`, // sender address
    to: `${data.email}`, // list of receivers
    subject: `Connexion à votre compte Wake up ${data.firstname} ${data.lastname}`, // Subject line
    text: 'Hello world?', // plain text body
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
    replyTo: `${data.email}`,
  }
}

const emailResetPassword = (email: string, token: string) => {
  return {
    from: `Wake up Clermont-Fd ${process.env.NODEMAILER_ACCOUNT}`, // sender address
    to: `${email}`, // list of receivers
    subject: `Réinitialisation mot de passe`, // Subject line
    html: `<body style="display: flex; flex-direction: column; font-family: roboto;">
    <br><div style="color: black; background-color: #e7e7e7; padding: 3rem; display: flex; flex-direction: column;">
    <h3>Vous avez effectué une demande de réinitialisation de mot de passe au de WAKE UP !</h3>
    <p>Veuillez cliquez sur le lien suivant </p>
    <p><a href="${process.env.CLIENT_URL}/reset-password?token=${token}&email=${email}" target="blank">${process.env.CLIENT_URL}/reset-password?token=${token}</a></p>
    <br>
    <p>Si toutefois vous n'étiez pas à l'origine de cette demande, merci de nous contacter par mail en cliquant <a href="mailto:contact@wakeupbox.fr">ici</a></p>
    <p>Sinon vous pouvez changer votre mot de passe en cliquant sur le lien suivant</p>
    </div></body>`,
  }
}

const confirmOrder = (data: OrderBody) => {
  const address = data.user.address // Get the address details from the user object

  return {
    from: `"Bienvenue chez Wake up" ${process.env.NODEMAILER_ACCOUNT}`, // sender address
    to: `${data.user.email}`, // list of receivers
    subject: `Confirmation de votre commande WAKE UP !`, // Subject line
    html: `
      <div style="background-color: #f2f2f2; padding: 20px;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
          <h1 style="color: #0069d9; font-size: 36px; margin-bottom: 20px;">Merci pour votre commande</h1>
          <p style="font-size: 18px; margin-bottom: 20px;">Nous avons bien pris en compte votre commande pour le ${data.booking_date} à livrer à l'adresse suivante:</p>
          <p style="font-size: 18px; margin-bottom: 20px;">${address.line1}</p>
          <p style="font-size: 18px; margin-bottom: 20px;">${address.postcode}, ${address.city}</p>
          <p style="font-size: 18px; margin-bottom: 20px;">N'hésitez pas à nous contacter si vous avez des questions, nous sommes là pour vous aider !</p>
          <a href="https://www.wakeupclf.fr" style="background-color: #0069d9; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 18px;">Découvrir Wake up</a>
        </div>
        <p style="font-size: 8px;">Vous pouvez vous désabonner de nos emails en cliquant sur ce lien : <a href="http://${process.env.CLIENT_URL}/unsubscribe">Se désabonner</a></p>
      </div>
    `,
  }
}

export {
  mailSignUp,
  connectEmail,
  emailReceived,
  emailResetPassword,
  confirmOrder,
}
