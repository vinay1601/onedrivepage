export let users = [
    {
        id: 1,
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Vinay'
    },
    {
        id: 2,
        email: 'admin2@example.com',
        password: 'admin123',
        name: 'Kapil'
    }
]


export const authUser = (email, password) => {
    return users.find(item => item.email === email && item.password === password)
}