const useFindById = (id, items) => {
  const itemId = parseInt(id);

  const item = items.find((element) => element.id === itemId);

  return item;
};

export default useFindById;
