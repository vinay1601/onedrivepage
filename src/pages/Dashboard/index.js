import { useState, useEffect } from 'react'
import Link from 'next/link'
import Auth from '../../lib/Auth'

export async function getServerSideProps(context) {
    const authCheck = Auth(context)
    if (authCheck.redirect) {
        return authCheck
    }
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseUrl}/api/apiData`)
    const listings = await res.json()

    return {
        props: { listings }
    }
}


export default function Dashboard({ listings }) {
    return (
        <div className="p-8">
            <h1 className="text-3xl mb-4">Car Listings Dashboard</h1>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Title</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listings.map((listing) => (
                        <tr key={listing.id} className="border">
                            <td className="p-2 border">{listing.title}</td>
                            <td className="p-2 border">{listing.status}</td>
                            <td className="p-2 border">
                                <button>Approve</button>
                                <button>Reject</button>
                                <Link href={`/dashboard/edit/${listing.id}`}>
                                    <button>Edit</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}