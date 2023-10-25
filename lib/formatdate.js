import { DateTime } from 'luxon';

export default function formatDateToFrench(dateString) {
  // Convert to the French timezone
  const date = DateTime.fromISO(dateString).setZone('Europe/Paris').setLocale('fr');

  const hours = date.toFormat('HH');
  const minutes = date.toFormat('mm');
  const day = date.toFormat('dd');
  const month = date.toFormat('MM');
  const year = date.toFormat('yyyy');

  return `crée à ${hours}h${minutes} le ${day}/${month}/${year}`;
}
