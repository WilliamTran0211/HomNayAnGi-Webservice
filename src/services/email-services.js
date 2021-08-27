const mailer = require('nodemailer');
const { Kinds } = require('../../common');

const EmailServices = function () {
    console.log('Create Email Services');

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

EmailServices.prototype.send = async function (toEmail, subject, htmlBody) {
    Kinds.mustExist(toEmail, 'toEmail');
    Kinds.mustExist(subject, 'subject');
    Kinds.mustExist(htmlBody, 'htmlBody');

    if (!this.transporter) {
        console.log('Mailer is disabled, skip for now.');
        return;
    }

    console.log('sendinggggg');

    const mailOptions = {
        from: this._from,
        to: toEmail,
        subject: subject,
        html: htmlBody // plain text body
    };

    return this.transporter.sendMail(mailOptions);
};

EmailServices.prototype.sendEmailActivation = async function () {};

EmailServices.prototype.sendEmailResetPasswordCode = async function () {};
