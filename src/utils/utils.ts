const randomDate = () => {
  return new Date(new Date().valueOf() + Math.random() * 1e10);
};

export { randomDate };
