import axios from 'axios';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.zaroorireturn.com');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Handle preflight request
    }

    if (req.method === 'POST') {
        const { title, message, target_url } = req.body;

        try {
            // Send notification to the specified Webpushr User ID
            const response = await axios.post('https://api.webpushr.com/v1/notification/send', {
                title: title,
                message: message,
                target_url: target_url,
                user_id: '158927973' // Target specific Webpushr User ID
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'webpushrKey': 'e64811450652a664a4f9a7d2c78d2127',  // Use your Webpushr API key
                    'webpushrAuthToken': '95418'  // Use your Webpushr Auth token
                }
            });

            res.status(200).json(response.data); // Send success response
        } catch (error) {
            console.error('Error sending notification:', error);
            res.status(500).json({ error: 'Failed to send push notification' }); // Handle errors
        }
    } else {
        res.setHeader('Allow', ['POST', 'OPTIONS']);
        res.status(405).end(`Method ${req.method} Not Allowed`); // Handle non-POST requests
    }
}
