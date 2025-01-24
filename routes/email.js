const express = require('express')
const router = express.Router()
const sendEmail = require('../services/emailSender');

router.post('/send-email', async (req, res) => {
    const { to, subject, content } = req.body;

    const result = await sendEmail(to, subject, content);
    res.status(result.success ? 200 : 500).send(result);
});
