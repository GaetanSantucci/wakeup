const mailSignUp = (lastname, firstname, message) => {
    return {
        from: `"Bienvenu chez Wake up" ${process.env.NODEMAILER_ACCOUNT}`,
        to: "gaetan.santucci@outlook.com",
        subject: `Hello ${lastname}`,
        text: "Hello world?",
        html: `<b>Hello ${lastname} ${firstname}</b><br>${message}`, // html body
    };
};
const connectEmail = (data) => {
    return {
        from: `"Information de connection" ${process.env.NODEMAILER_ACCOUNT}`,
        to: `${data.email}`,
        subject: `Connexion à votre compte Wake up ${data.firstname} ${data.lastname}`,
        text: "Hello world?",
        html: '<b>Bonjour, </b><br> Vous venez de vous connecter sur notre plateforme <br> Si toutefois vous n&apos;etes pas a l&apos;origine de cette connection, veuillez nous contacter a cette adresse suivante : <br><a href="mailto:contact@wakeupbox.fr">contact@wakeupbox.fr</a>',
    };
};
const emailReceived = (data) => {
    const mailList = [
        'contact@wakeupbox.fr',
        'gaetan.santucci@outlook.com'
    ];
    return {
        from: `Wake up Clermont-Fd ${process.env.NODEMAILER_ACCOUNT}`,
        to: mailList,
        subject: `Demande de renseignements`,
        // text: `Hello world? ${data.lastname}`, // plain text body
        html: `<body style="display: flex; flex-direction: column; font-family: roboto;">
    <br><div style="color: black; background-color: #e7e7e7; padding: 3rem; display: flex; flex-direction: column;">
    <h3>Vous avez un message de ${data.firstname} ${data.lastname}</h3>
    <p>Téléphone : ${data.phone}</p>
    <p>Email : ${data.email}</p>
    <p>Message : ${data.message}</p>
    <button type="button" value="Repondre" style="background-color: #0069d9;"><a href="mailto:${data.email}" style="color: white; padding: 1rem; text-align: center; text-decoration: none;" target="blank">Répondre</a></button>
    </div></body>`
    };
};
// <a href='mailto:${data.email}><button type="button">Repondre</button></a>
export { mailSignUp, connectEmail, emailReceived };
