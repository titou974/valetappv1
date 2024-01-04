"use client";
import { DateTime } from "luxon";

export default function formatHour(startingHour) {
  const startingHourUTC = DateTime.fromISO(startingHour);
  const startingHourFrance = startingHourUTC.setZone("Europe/Paris");
  const startingHourFormat = startingHourFrance
    .toFormat("HH:mm")
    .replace(":", "h");

  return startingHourFormat;
};

