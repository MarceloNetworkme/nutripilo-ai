import dayjs from "dayjs";

export function diffDays(t: any) {
  return (date: string, brackets = false) => {
    const agora = dayjs();
    const data = dayjs.utc(date).local();
    const diffMinutes = Math.abs(agora.diff(data, "minutes"));
    const diff = Math.abs(agora.diff(data, "hours"));
    const diffDays = Math.abs(agora.diff(data, "days"));

    let result = "";

    const dateInFuture = agora.isBefore(data);

    if (diffMinutes < 60 && diffMinutes > 0) {
      result = diffMinutes === 1 ? t(`recruiter:pages.candidates.titles.${dateInFuture ? "minuteFromNow" : "minuteAgo"}`, { count: diffMinutes }) : t(`recruiter:pages.candidates.titles.${dateInFuture ? "minutesFromNow" : "minutesAgo"}`, { count: diffMinutes });
    } else if (diff < 24 && diff > 0) {
      result = diff === 1 ? t(`recruiter:pages.candidates.titles.${dateInFuture ? "hourFromNow" : "hourAgo"}`, { count: diff }) : t(`recruiter:pages.candidates.titles.${dateInFuture ? "hoursFromNow" : "hoursAgo"}`, { count: diff });
    } else {
      result = diffDays === 1 ? t(`recruiter:pages.candidates.titles.${dateInFuture ? "tomorrow" : "yesterday"}`) : diffDays === 0 ? t(`recruiter:pages.candidates.titles.now`) : t(`recruiter:pages.candidates.titles.${dateInFuture ? "daysFromNow" : "daysAgo"}`, { count: diffDays });
    }

    return brackets ? `(${result.trimEnd()})` : result;
  };
}
