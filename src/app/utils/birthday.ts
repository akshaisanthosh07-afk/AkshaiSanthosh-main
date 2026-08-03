/**
 * Utility to check if it's the user's birthday period.
 * Birthday month: August
 * Birthday day: August 18
 * Birthday period: August 1 to August 18
 */
export function checkBirthdayStatus() {
  if (typeof window === 'undefined') {
    return { isBirthdayPeriod: false, isBirthdayDay: false };
  }

  const now = new Date();
  const urlParams = new URLSearchParams(window.location.search);
  
  // Developer override options:
  // ?birthday=true  -> simulates exact birthday day (Aug 18)
  // ?birthday=month -> simulates birthday month but not the day
  // ?birthday=false -> forces normal UI
  if (urlParams.has('birthday')) {
    const val = urlParams.get('birthday');
    if (val === 'true') {
      return { isBirthdayPeriod: true, isBirthdayDay: true };
    } else if (val === 'month') {
      return { isBirthdayPeriod: true, isBirthdayDay: false };
    } else if (val === 'false') {
      return { isBirthdayPeriod: false, isBirthdayDay: false };
    }
  }

  const month = now.getMonth(); // 7 = August (0-indexed)
  const date = now.getDate();   // 1 to 31

  const isBirthdayPeriod = (month === 7 && date <= 18);
  const isBirthdayDay = (month === 7 && date === 18);

  return { isBirthdayPeriod, isBirthdayDay };
}
