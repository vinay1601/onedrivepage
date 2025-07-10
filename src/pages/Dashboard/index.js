import { useState, useEffect } from 'react'
import Link from 'next/link'
import Auth from '../../lib/Auth'
import { useSelector, useDispatch } from 'react-redux'
import { showFeedback } from '@/store/feedbackSlice'

export async function getServerSideProps(context) {
    const authCheck = Auth(context)
    if (authCheck.redirect) {
        return authCheck
    }
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseUrl}/api/apiData`)
    const listings = await res.json()

    console.log(listings)
    return {
        props: { listings }
    }
}


export default function Dashboard({ listings }) {
    const [filteredStatus, setFilteredStatus] = useState("all")
    const [filteredListings, setFilteredListings] = useState(listings)
    const [showModal, setShowModal] = useState(false)
    const username = useSelector(state => state.auth.username)
    const [currentListing, setCurrentListing] = useState(null)
    const dispatch = useDispatch()


    useEffect(() => {
        if (filteredStatus === "all") {
            setFilteredListings(listings)
        } else {
            const filtered = listings.filter(item => item.status === filteredStatus)
            setFilteredListings(filtered)
        }
    }, [filteredStatus, listings])

    const handleEditClick = (listing) => {
        setCurrentListing(listing)
        setShowModal(true)
    }

    const handleInputChange = (e) => {
        setCurrentListing({ ...currentListing, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e, listingToUpdate = currentListing) => {
        if (e) e.preventDefault();

        if (!listingToUpdate || !listingToUpdate.id) {
            dispatch(showFeedback({ type: 'error', message: 'Listing data is invalid.!' }));
            return;
        }

        const originalListing = listings.find(item => item.id === listingToUpdate.id);
        const changedFields = {};
        for (const key in listingToUpdate) {
            if (listingToUpdate[key] !== originalListing[key]) {
                changedFields[key] = {
                    from: originalListing[key],
                    to: listingToUpdate[key]
                };
            }
        }

        const res = await fetch(`/api/${listingToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(listingToUpdate),
        });

        if (res.ok) {
            const updated = await res.json();
            setFilteredListings((prev) =>
                prev.map((item) => (item.id === updated.id ? updated : item))
            );

            if (listingToUpdate === currentListing) {
                setShowModal(false);
            }

            await fetch('/api/logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    admin: username || 'Unknown',
                    action: `Updated listing fields`,
                    target: updated.title,
                    changes: changedFields,
                    timestamp: new Date().toISOString(),
                }),
            });

            dispatch(showFeedback({ type: 'success', message: 'Listing updated!' }));
        } else {
            dispatch(showFeedback({ type: 'error', message: 'Failed to update' }));
        }
    };


    const quickUpdateStatus = (listing, newStatus) => {
        const updatedListing = { ...listing, status: newStatus };
        handleSubmit(null, updatedListing);
    };



    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Car Listings</h1>
            <div className="mb-4 flex items-center gap-4">
                <label className="text-lg font-medium">Filter by Status:</label>
                <select
                    className="border p-2 rounded-md"
                    value={filteredStatus}
                    onChange={(e) => setFilteredStatus(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <div className="overflow-x-auto shadow rounded-lg">
                <table className="w-full table-auto text-sm border border-gray-300">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3 border-b">Title</th>
                            <th className="p-3 border-b">Status</th>
                            <th className="p-3 border-b">Price</th>
                            <th className="p-3 border-b">Location</th>
                            <th className="p-3 border-b">Owner Email</th>
                            <th className="p-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredListings.length > 0 ? (
                            filteredListings.map((listing) => (
                                <tr key={listing.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{listing.title}</td>
                                    <td className="p-3 capitalize">{listing.status}</td>
                                    <td className="p-3 capitalize">{listing.pricePerDay}</td>
                                    <td className="p-3 capitalize">{listing.location}</td>
                                    <td className="p-3 capitalize">{listing.owner}</td>
                                    <td className="p-3 flex gap-2">
                                        <button
                                            onClick={() => quickUpdateStatus(listing, 'approved')}
                                            className="px-2 py-1 bg-green-500 text-white rounded"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => quickUpdateStatus(listing, 'rejected')}
                                            className="px-2 py-1 bg-red-500 text-white rounded"
                                        >
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => handleEditClick(listing)}
                                            className="px-2 py-1 bg-blue-500 text-white rounded"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-4 text-gray-500">
                                    No listings found for this status.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && currentListing && (
                <div className="fixed inset-0 bg-gray-200/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-3xl shadow-md w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Car Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-base font-medium mb-1">Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={currentListing.title}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"

                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Price:</label>
                                <input
                                    type="text"
                                    name="pricePerDay"
                                    value={currentListing.pricePerDay}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"

                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Location:</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={currentListing.location}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"

                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Status:</label>
                                <select
                                    name="status"
                                    value={currentListing.status}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
