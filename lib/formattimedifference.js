export default function formatTimeDifference(createdAt, endAt) {
  const start = new Date(createdAt);
  const end = new Date(endAt);

  const differenceInMillis = end - start;

  const totalMinutes = Math.floor(differenceInMillis / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours > 0 ? `${hours}H` : ""}${minutes} ${hours < 1 ? `${minutes > 1 ? "minutes" : "minute"}` : ""}`;
}
