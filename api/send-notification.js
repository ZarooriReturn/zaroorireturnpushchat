import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await axios.post('https://api.webpushr.com/v1/notification/send/all', {
                title: req.body.title,
                message: req.body.message,
                target_url: req.body.target_url,
                icon: req.body.icon
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'webpushrKey': 'e64811450652a664a4f9a7d2c78d2127',
                    'webpushrAuthToken': '95418'
                }
            });

            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error sending notification:', error);
            res.status(500).json({ error: 'Failed to send push notification' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
