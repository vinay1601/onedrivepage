import { getListings, getListingById, updateListing } from '../../lib/DataStore'



export default function handler(req, res) {
    const { id } = req.query;
    console.log("dhdf", id)

    if (req.method === 'GET') {
        const listing = getListingById(id);
        if (!listing) return res.status(404).json({ message: 'Not found' });
        return res.status(200).json(listing);
    }

    if (req.method === 'PUT') {
        const updated = updateListing(id, req.body);
        console.log(updated)
        if (!updated) return res.status(404).json({ message: 'Not found' });
        return res.status(200).json(updated);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}