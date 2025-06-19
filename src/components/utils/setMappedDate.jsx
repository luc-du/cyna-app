const setMappedDate = (date) => {
  const mappedDate = date.createdAt
    ? new Date(date.createdAt).toLocaleDateString()
    : "N/A";
  return mappedDate;
};

export default setMappedDate;
