export default async function getTicketsOfSession(setTickets) {
    console.log(restaurantId, startedHour);
    try {
    const apiUrl = `${window.location.protocol}//${window.location.host}`;
    const response = await axios.get(`${apiUrl}/api/ticketsforvalet`,
        { params: { restaurantId: restaurantId, startDate: startedHour } }
    );
    setTickets(response.data.tickets);
        console.log("voila vos tickets", response.data);
    } catch (error) {
        console.log("Error fetching tickets:", error.message);
    }
};
