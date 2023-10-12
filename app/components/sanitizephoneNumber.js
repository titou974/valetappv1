export default function sanitizePhoneNumber(phoneNumber) {
  const sanitized = phoneNumber.replace(/\D/g, ""); // Remove non-numeric characters

  // If it starts with '33' and has more than 10 digits (country code included), replace '33' with '0'
  if (sanitized.startsWith("33") && sanitized.length > 10) {
      return '0' + sanitized.substring(2);
  }

  // If it starts with '0' and is 11 digits long, assume it's in the form '033612345678' and remove the leading '0'
  if (sanitized.startsWith("0") && sanitized.length === 11) {
      return sanitized.substring(1);
  }

  return sanitized;
}
