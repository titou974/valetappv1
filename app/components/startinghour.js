"use client"
import { DateTime } from "luxon";

const StartingHour = ({startingHour}) => {

  const startingHourUTC = DateTime.fromISO(startingHour);
  const startingHourFrance = startingHourUTC.setZone('Europe/Paris');
  const startingHourFormat = startingHourFrance.toFormat('HH:mm').replace(':', 'h');

  return (
    <div>
      <p className='text-center py-2'>Vous avez commencé à {startingHourFormat}</p>
    </div>
  )
}

export default StartingHour;
