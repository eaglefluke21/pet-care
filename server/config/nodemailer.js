import nodemailer from nodemailer;


//object to send mail to users
export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '',
        pass: '',
        
    },
});

