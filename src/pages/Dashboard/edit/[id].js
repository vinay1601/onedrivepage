import { useState } from 'react';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
    const { id } = context.params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(`${baseUrl}/api/${id}`);
    if (!res.ok) {
        return {
            notFound: true,
        };
    }

    const listing = await res.json();

    return {
        props: {
            listing,
        },
    };
}

export default function EditListing({ listing }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: listing.title,
        status: listing.status,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/${listing.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            router.push('/dashboard');
        } else {
            alert('Failed to update listing');
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Edit Listing</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label className="block font-medium mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Update Listing
                </button>
            </form>
        </div>
    );
}
