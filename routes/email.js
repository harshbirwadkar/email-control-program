const express = require('express')
const router = express.Router()
const sendEmail = require('../services/emailSender');
const { fetchEmails } = require('../services/emailReader');

router.post('/send-email', async (req, res) => {
    const { to, subject, content } = req.body;

    const result = await sendEmail(to, subject, content);
    res.status(result.success ? 200 : 500).send(result);
});

router.post('/read-emails', async (req, res) => {
    const { user, password, host } = req.body; // Safely retrieve from the request body

    if (!user || !password || !host) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    try {
        const emails = await fetchEmails(user, password, host);
        res.status(200).json({ success: true, emails });
    } catch (err) {
        console.error('Error fetching emails:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
