"use client";
import { DateTime } from "luxon";

export default function formatHour(startingHour) {
  const startingHourUTC = DateTime.fromISO(startingHour);
  console.log(startingHourUTC);
  const startingHourFrance = startingHourUTC.setZone("Europe/Paris");
  const startingHourFormat = startingHourFrance
    .toFormat("HH:mm")
    .replace(":", "h");

  console.log(startingHourFrance);
  return startingHourFormat;
};

