import { addLog, getLogs } from '../../../lib/LogStore';

export default function handler(req, res) {
    if (req.method === 'GET') {
        return res.status(200).json(getLogs());
    }

    if (req.method === 'POST') {
        const { admin, action, target, changes } = req.body;

        if (!admin || !action || !target) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        addLog({ admin, action, target, changes });
        return res.status(201).json({ success: true });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
