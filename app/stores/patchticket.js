import axios from "axios";

export const patchTicket = async ({ ticketId, immatriculation }) => {
  const { data } = await axios.patch(`/api/ticket/${ticketId}`, {
    immatriculation,
  });
  return data;
};