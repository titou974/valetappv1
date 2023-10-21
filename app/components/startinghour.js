"use client"
import { DateTime } from "luxon";

const StartingHour = ({startingHour}) => {

  const startingHourUTC = DateTime.fromISO(startingHour);
  console.log(startingHourUTC)
  const startingHourFrance = startingHourUTC.setZone('Europe/Paris');
  const startingHourFormat = startingHourFrance.toFormat('HH:mm').replace(':', 'h');

  console.log(startingHourFrance);
  return (
    <div>
      <p className='text-center py-2'>Vous avez commencé à {startingHourFormat}</p>
    </div>
  )
}

export default StartingHour;
