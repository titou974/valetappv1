import axios from 'axios';

export default async function createTicket({ router, siteId, companyId }) {
  const response = await axios.post('/api/ticket', {
    role: 'CLIENT',
    restaurant: siteId,
  });
  const data = await response.data;
  if (data.ticketId && companyId) {
    router.push(`/ticket?ticket=${data.ticketId}&c=${companyId}`);
  } else if (data.ticketId) {
    router.push(`/ticket?ticket=${data.ticketId}`);
  } else console.log('no ticket id precised');
  return data;
}
