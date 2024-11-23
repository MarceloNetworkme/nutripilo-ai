import { DateRange } from "components/date-range-input";
import dayjs from "dayjs";

// -----------------------------------------------------------------
const CreationDateEnum = (creationDate: string) => {
  let initCreationDate: string | undefined;
  let finCreationDate: string | undefined;
  switch (creationDate) {
    case "today": {
      initCreationDate = dayjs().startOf("day").toISOString();
      finCreationDate = dayjs().endOf("day").toISOString();
      break;
    }
    case "yesterday": {
      initCreationDate = dayjs().subtract(1, "day").startOf("day").toISOString();
      finCreationDate = dayjs().subtract(1, "day").endOf("day").toISOString();
      break;
    }
    case "last7days": {
      initCreationDate = dayjs().subtract(7, "day").startOf("day").toISOString();
      finCreationDate = dayjs().endOf("day").toISOString();
      break;
    }
    case "last30days": {
      initCreationDate = dayjs().subtract(30, "day").startOf("day").toISOString();
      finCreationDate = dayjs().endOf("day").toISOString();
      break;
    }
    case "last3months": {
      initCreationDate = dayjs().subtract(3, "month").startOf("day").toISOString();
      finCreationDate = dayjs().endOf("day").toISOString();
      break;
    }
  }
  return { initCreationDate, finCreationDate };
};

const CreationDateCustom = (creationDateCustom: DateRange) => {
  let initCreationDate: string | undefined;
  let finCreationDate: string | undefined;
  switch (creationDateCustom?.type) {
    case "interval": {
      initCreationDate = creationDateCustom?.startDate;
      finCreationDate = creationDateCustom?.endDate;
      break;
    }
    case "since": {
      initCreationDate = creationDateCustom?.startDate;
      break;
    }
    case "range": {
      initCreationDate = dayjs()
        .subtract(creationDateCustom?.range || 0, creationDateCustom?.rangeType || "day")
        .toISOString();
      finCreationDate = dayjs().toISOString();
      break;
    }
  }
  return { initCreationDate, finCreationDate };
};

export const useDateParsing = {
  CreationDateEnum,
  CreationDateCustom,
};
