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
    {
        id: 5,
        title: "Audi A6 2021",
        location: "Al Barsha",
        pricePerDay: 280,
        status: "pending",
        owner: "user5@gmail.com",
        submittedAt: "2025-07-02T11:10:00Z",
    },
    {
        id: 6,
        title: "Ford Mustang 2020",
        location: "Jumeirah",
        pricePerDay: 320,
        status: "approved",
        owner: "user6@gmail.com",
        submittedAt: "2025-07-01T15:25:00Z",
    },

]


export function getListings() {
    return demoData;
}

export function getListingById(id) {
    return demoData.find((l) => l.id === parseInt(id));
}

export function updateListing(id, updatedData) {
    // console.log("data update", id, updatedData);
    const index = demoData.findIndex((l) => l.id === parseInt(id));

    console.log("db data", index)

    if (index !== -1) {
        demoData[index] = { ...demoData[index], ...updatedData };
        return demoData[index];
    }

    return null;
}