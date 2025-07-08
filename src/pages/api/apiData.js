let demoData = [
  {
    id: 1,
    title: "Toyota Corolla 2020",
    location: "Dubai Marina",
    pricePerDay: 150,
    status: "pending",
    owner: "user1@gmail.com",
    submittedAt: "2025-07-06T10:15:00Z",
  },
  {
    id: 2,
    title: "BMW 5 Series 2022",
    location: "Abu Dhabi",
    pricePerDay: 300,
    status: "approved",
    owner: "user2@gmail.com",
    submittedAt: "2025-07-05T12:30:00Z",
  },
  {
    id: 3,
    title: "Nissan Altima 2019",
    location: "Sharjah",
    pricePerDay: 120,
    status: "rejected",
    owner: "user3@gmail.com",
    submittedAt: "2025-07-04T09:45:00Z",
  },
  {
    id: 4,
    title: "Mercedes-Benz GLC 2023",
    location: "Business Bay",
    pricePerDay: 450,
    status: "pending",
    owner: "user4@gmail.com",
    submittedAt: "2025-07-03T14:20:00Z",
  },
]



export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(demoData)
  }

  if (req.method === 'POST') {
    const { id, status } = req.body
    demoData = demoData.map(item =>
      item.id === id ? { ...item, status } : item
    )
    return res.status(200).json({ success: true })
  }
}

// export function getInfoById(id) {
//   return demoData.find((item) => item.id === id)
// }

// export function allData() {
//   return demoData
// }

// export function updateInfo(id, data) {
//   demoData = demoData.map((item) => item.id === id ? { ...item, ...data } : item)
// }

// export function approveInfo(id) {
//   updateInfo(id, { status: "approved" })
// }


// export function rejectInfo(id) {
//   updateInfo(id, { status: "rejected" })
// }
