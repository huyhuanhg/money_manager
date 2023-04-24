import { Moment } from "moment";

export const dayOfWeek = (day: number | Moment) => {
  if (typeof day !== "number") {
    day = Number(day.format("d"));
  }

  switch (day) {
    case 1:
      return "Thứ Hai";
    case 2:
      return "Thứ Ba";
    case 3:
      return "Thứ Tư";
    case 4:
      return "Thứ Năm";
    case 5:
      return "Thứ Sáu";
    case 6:
      return "Thứ Bảy";
    default:
      return "Chủ nhật";
  }
};

export const arrKeyBy = (array: Record<string, any>[], key: string) => {
  return array.reduce((result, item, index) => {
    if (!item.hasOwnProperty(key)) {
      throw new Error(`Item ${index} not exist key: ${key}`);
    }

    result[item[key]] = item;

    return result;
  }, {});
};
