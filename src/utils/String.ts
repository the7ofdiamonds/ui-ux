export function camelCaseToSnakeCase(input: string) {
  return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export function camelCaseToPath(input: string) {
  return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function snakeCaseToPath(input: string) {
  return input.replace(/_/, '-').toLowerCase();
}

export function spaceToPath(input: string) {
  return input.replace(/\s+/g, '-').toLowerCase();
}

export function pathToSpace(input: string) {
  return input.replace(/-/, ' ').toLowerCase();
}

export function formatTime(input: string) {
  const date = new Date(input);
  const pad = (num: number) => String(num).padStart(2, '0');

  const month = typeof date.getMonth() === 'number' ? date.getMonth() : null;
  const day = typeof date.getDate() === 'number' ? date.getDate() : null;
  const year =
    typeof date.getFullYear() === 'number' ? date.getFullYear() : null;
  const hour = typeof date.getHours() === 'number' ? date.getHours() : null;
  const minute =
    typeof date.getMinutes() === 'number' ? date.getMinutes() : null;
  const seconds =
    typeof date.getMinutes() === 'number' ? date.getMinutes() : null;

  if (month && day && year && hour && minute && seconds) {
    const mm = pad(month + 1);
    const dd = pad(day);

    const hh = pad(hour);
    const min = pad(minute);
    const ss = pad(seconds);

    return `${mm}/${dd}/${year} @ ${hh}:${min}:${ss}`;
  }

  return null;
}
