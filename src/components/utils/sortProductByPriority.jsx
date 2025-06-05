const sortProductsByPriority = (products) => {
  return [...products].sort((a, b) => {
    const priority = (p) => {
      if (p.active && p.promo) return 0;
      if (p.active) return 1;
      return 2;
    };

    return priority(a) - priority(b);
  });
};

export default sortProductsByPriority;
