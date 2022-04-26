export function formateDate(date: Date): String {
  const allDate = new Date(date);
  let day: number | string = allDate.getDay();
  if (day < 10) {
    day = '0' + day;
  }
  let mouth: number | string = allDate.getMonth();
  if (mouth < 10) {
    mouth = `0${mouth}`;
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
  return `${day} / ${mouth} / ${year}  ${hour}:${minutes}`;
}
