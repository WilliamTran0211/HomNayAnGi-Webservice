const mailer = require('nodemailer');
const ejs = require('ejs');
const { Kinds } = require('../../common');

const EmailServices = function (app) {
    console.log('Create Email Services');

    this.app = app;

    let mailHost = process.env.MAILER_HOST;
    let mailPort = process.env.MAILER_PORT;
    let mailUser = process.env.MAILER_USER;
    let mailPass = process.env.MAILER_PASSWORD;
    let enable = process.env.MAILER_ENABLE;
    let secure = process.env.MAILER_SECURE;
    let sender = process.env.MAILER_SENDER;

    enable = enable === 'true';
    secure = secure === 'true';

    if (enable) {
        Kinds.mustExist(mailHost);
        Kinds.mustExist(mailPort);
        Kinds.mustExist(secure);
        Kinds.mustExist(sender);

        this._from = sender;

        this.transporter = mailer.createTransport({
            host: mailHost,
            port: mailPort,
            secure,
            auth: {
                user: mailUser,
                pass: mailPass
            }
        });

        // this.transporter.verify((err, success) => {
        //     if (err) console.error(err);
        //     console.log('Your config is correct');
        // });
    }
};

module.exports = EmailServices;

const Templates = {
    render: async (filename, data) => {
        return ejs.renderFile(`${__dirname}/email-templates/${filename}`, data, {
            async: true
        });
    }
};

EmailServices.prototype.send = async function (toEmail, subject, htmlBody) {
    Kinds.mustExist(toEmail, 'toEmail');
    Kinds.mustExist(subject, 'subject');
    Kinds.mustExist(htmlBody, 'htmlBody');

    if (!this.transporter) {
        console.log('Mailer is disabled, skip for now.');
        return;
    }

    const mailOptions = {
        from: this._from,
        to: toEmail,
        subject: subject,
        html: htmlBody
    };

    return this.transporter.sendMail(mailOptions);
};

EmailServices.prototype.sendResetPasswordCode = async function (toEmail, userDisplayName, code) {
    Kinds.mustExist(toEmail);
    Kinds.mustExist(userDisplayName);
    Kinds.mustExist(code);

    const data = {
        email: toEmail,
        userDisplayName: userDisplayName,
        code: code,
        message: 'For you security, this code will be expired in 3 minutes!'
    };

    const emailBody = await Templates.render('user-forgot-password.html', data);
    console.log('sending');
    return this.send(toEmail, 'Password reset code!', emailBody);
};

EmailServices.prototype.sendEmailVerifyCode = async function (toEmail, code) {
    Kinds.mustExist(toEmail);
    Kinds.mustExist(code);

    const data = {
        userEmail: toEmail,
        code: code,
        message: 'This code will be expired in 3 minutes!'
    };
};
