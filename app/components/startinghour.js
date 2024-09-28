'use client';
import { DateTime } from 'luxon';

const StartingHour = ({ startingHour }) => {
  const startingHourUTC = DateTime.fromISO(startingHour);
  const startingHourFrance = startingHourUTC.setZone('Europe/Paris');
  const startingHourFormat = startingHourFrance
    .toFormat('HH:mm')
    .replace(':', 'h');

  return (
    <div>
      <p className='py-2 text-center'>
        Vous avez commencé à {startingHourFormat}
      </p>
    </div>
  );
};

export default StartingHour;
