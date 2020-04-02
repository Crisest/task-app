const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const welcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ymurillov@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const cancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ymurillov@gmail.com',
        subject: 'We are sorry to see you go',
        text: `We hope to see you very soon ${name}!.`
    })
}
module.exports = {
    welcomeEmail,
    cancelationEmail
}