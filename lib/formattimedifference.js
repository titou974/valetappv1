export const getSessionTime = (hours, minutes) => {
  if (!hours && !minutes) {
    return 'un certain temps';
  } else if (hours > 0 && minutes > 0) {
    return `${hours}H${minutes}`;
  } else if (hours > 0 && minutes < 1) {
    return `${hours}H`;
  } else if (hours < 1 && minutes > 0) {
    return `${minutes > 1 ? `${minutes} minutes` : `${minutes} minute`}`;
  } else if (hours > 24) {
    return "plus de 24H. Reposez vous bien !";
  } else {
    return "0 minutes";
  }
}


export default function formatTimeDifference(createdAt, endAt) {
  if (!createdAt || !endAt) return "un certain temps";
  const start = new Date(createdAt);
  const end = new Date(endAt);

  const differenceInMillis = end - start;
  console.log(differenceInMillis)
  const totalMinutes = Math.floor(differenceInMillis / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  console.log('hello', createdAt, endAt, hours, minutes)

  return getSessionTime(hours, minutes);
}
