export default async function getTicketsOfSession(setTickets) {
  try {
    const apiUrl = `${window.location.protocol}//${window.location.host}`;
    const response = await axios.get(`${apiUrl}/api/ticketsforvalet`, {
      params: { restaurantId: restaurantId, startDate: startedHour },
    });
    setTickets(response.data.tickets);
  } catch (error) {
    console.log('Error fetching tickets:', error.message);
  }
}
