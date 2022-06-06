export function formateDate(date: string): string {
  const allDate = new Date(date);
  let day: number | string = allDate.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  let mouth: number | string = allDate.getMonth();
  if (mouth < 9) {
    mouth = `0${mouth + 1}`;
  } else {
    mouth = `${mouth + 1}`;
  }
  const year = allDate.getFullYear();
  let hour: number | string = allDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes: number | string = allDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${year}.${mouth}.${day}  ${hour}:${minutes}`;
}
