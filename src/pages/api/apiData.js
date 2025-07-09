import { getListings } from '../../lib/DataStore'

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(getListings())
  }

  if (req.method === 'POST') {
    const { id, status } = req.body
    const listings = getListings()
    const index = listings.findIndex(item => item.id === id)
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Listing not found' })
    }
    listings[index].status = status;
    return res.status(200).json({ success: true, updated: listings[index] })
  }
  return res.status(405).json({ message: 'Method not allowed' })
}
