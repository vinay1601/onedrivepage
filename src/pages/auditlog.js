import Auth from '../lib/Auth'

export async function getServerSideProps(context) {
    const authCheck = Auth(context)
    if (authCheck.redirect) {
        return authCheck
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseUrl}/api/logs`)
    const logs = await res.json()

    return {
        props: { logs }
    }
}

export default function AuditLogPage({ logs }) {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Audit Trail</h1>
            <table className="w-full border text-sm">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-2 border">Admin</th>
                        <th className="p-2 border">Action</th>
                        <th className="p-2 border">Target</th>
                        <th className="p-2 border">Updated Fields</th>
                        <th className="p-2 border">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-2 border">{log.admin}</td>
                            <td className="p-2 border">{log.action}</td>
                            <td className="p-2 border">{log.target}</td>
                            <td className="p-2 border">
                                {log.changes
                                    ? Object.entries(log.changes).map(([key, value], i) => (
                                        <div key={i}>
                                            <strong>{key}</strong>: {value.from} = {value.to}
                                        </div>
                                    ))
                                    : '-'}
                            </td>
                            <td className="p-2 border">{new Intl.DateTimeFormat('en-GB', {
                                dateStyle: 'short',
                                timeStyle: 'medium',
                            }).format(new Date(log.timestamp))}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
