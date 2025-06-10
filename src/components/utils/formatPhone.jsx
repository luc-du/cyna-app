export const formatPhone = (num) => {
  const str = num.toString().padStart(10, "0");
  return str.replace(/(\d{2})(?=\d)/g, "$1 ").trim(); // "06 01 02 03 04"
};
