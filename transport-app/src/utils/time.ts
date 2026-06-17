export function getMinutesUntil(dateString: string) {
  const diff = new Date(dateString).getTime() - Date.now();
  return Math.max(0, Math.round(diff / 60000));
}