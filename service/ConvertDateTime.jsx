import moment from "moment";

export const FormatDate = (timeStamp) => {
  return new Date(timeStamp);
};

export const formatDateForTxt = (date) => {
  return moment(date).format("ll");
};

export const formatTime = (timeStamp) => {
  const date = new Date(timeStamp);
  const timeString = date.toLocaleTimerString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return timeString; //Ex. 9:00 AM
};
