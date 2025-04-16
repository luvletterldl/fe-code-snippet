export function fmtTimeDiff(preTime) {
  let diff = Math.floor(Date.now() / 1000) - preTime;
  let unit = 'second';
  if (Math.abs(diff) > 43200 * 60 * 12) {
    diff = diff / (43200 * 60 * 12);
    unit = 'year';
  }
  if (Math.abs(diff) > 43200 * 60) {
    diff = diff / (43200 * 60);
    unit = 'month';
  }
  else if (Math.abs(diff) > 10080 * 60) {
    diff = diff / (10080 * 60);
    unit = 'week';
  }
  else if (Math.abs(diff) > 1440 * 60) {
    diff = diff / (1440 * 60);
    unit = 'day';
  }
  else if (Math.abs(diff) > 3600) {
    diff = diff / 3600;
    unit = 'hour';
  }
  else if (Math.abs(diff) > 0) {
    diff = diff / 60;
    unit = 'minute';
  }
  diff = Math.floor(diff);
  return new Intl.RelativeTimeFormat('zh', { numeric: 'auto' }).format(-diff, unit);
}
