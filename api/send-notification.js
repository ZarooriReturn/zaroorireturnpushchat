import axios from 'axios';

export default async function handler(req, res) {
    // Set CORS headers to allow your frontend domain
    res.setHeader('Access-Control-Allow-Origin', 'https://www.dadearn.online'); // Update with your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Respond to preflight requests with a 200 OK
    }

    // Handle POST requests
    if (req.method === 'POST') {
        const { title, message, target_url, sid } = req.body; // Accept title, message, target_url, and sid

        // Validate required fields
        if (!title || !message || !target_url || !sid) {
            return res.status(400).json({
                status: 'error',
                description: 'Missing required fields: title, message, target_url, or sid.'
            });
        }

        try {
            // Send notification to the specified Webpushr Subscriber ID
            const response = await axios.post(`https://api.webpushr.com/v1/notification/send/${sid}`, {
                title: title,
                message: message,
                target_url: target_url,
                sid: sid // Use the passed Subscriber ID
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'webpushrKey': 'e64811450652a664a4f9a7d2c78d2127',  // Use your Webpushr API key
                    'webpushrAuthToken': 'e33e36e12570ca28ebc5d8e67c3ed207' // Use your Webpushr Auth token
                }
            });

            res.status(200).json({
                status: 'success',
                description: 'Notification sent successfully!',
                data: response.data // Include response data for further checks if needed
            });
        } catch (error) {
            console.error('Error sending notification:', error);
            res.status(error.response ? error.response.status : 500).json({
                status: 'error',
                description: error.response ? error.response.data.description : 'Internal Server Error'
            });
        }
    } else {
        // Respond with 405 Method Not Allowed for unsupported methods
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
