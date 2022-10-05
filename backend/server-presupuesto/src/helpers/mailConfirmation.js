import sgMail from '@sendgrid/mail';
import config from '../settings';

const { email_api_key, front_url } = config;

// Set the key of email
sgMail.setApiKey(email_api_key);

export const sendMailConfirmation = async (data) => {
    let msgSent = '';
    const { name, lastName, email, token } = data;
    const msg = {
        to: email,
        from: 'tuyucjames@gmail.com',
        subject: `${name}, Confirm your Account`,
        text: 'Confirm your account',
        html: `
            <p>Hi, ${name} ${lastName}, just one step to verify your account </p>
            <p>Just click the link below</p>
            <a href="${front_url}/confirm-account/${token}">Verify your account</a>
            <p>Something weird, reported at: <span>tuyucjames@gmail.com</span></p>
        `,
    }

    msgSent = await sgMail.send(msg)
    .then( (res) => {
        return msgSent = 'Mail sent correctly.'
    })
    .catch( (err) => {
        return msgSent = 'Unable to sent the email.'
    })

    return msgSent;
}