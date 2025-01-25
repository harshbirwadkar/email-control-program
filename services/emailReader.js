const Imap = require('imap');
const inspect = require('util').inspect;

const fetchEmails = (user, password, host) => {
    const imap = new Imap({
        user,
        password,
        host,
        port: 993,
        tls: true,
    });

    return new Promise((resolve, reject) => {
        function openInbox(cb) {
            imap.openBox('INBOX', true, cb);
        }

        imap.once('ready', function () {
            openInbox((err, box) => {
                if (err) reject(err);

                imap.search(['UNSEEN'], (err, results) => {
                    if (err) reject(err);
                    const fetch = imap.fetch(results, { bodies: '' });

                    const emails = [];
                    fetch.on('message', (msg, seqno) => {
                        let emailBody = '';
                        msg.on('body', (stream) => {
                            stream.on('data', (chunk) => {
                                emailBody += chunk.toString();
                            });
                            stream.once('end', () => {
                                emails.push(emailBody);
                            });
                        });
                    });

                    fetch.once('end', () => {
                        imap.end();
                        resolve(emails);
                    });
                });
            });
        });

        imap.once('error', (err) => reject(err));
        imap.connect();
    });
};

module.exports = { fetchEmails };
