const Index = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { route, query } = getCurrentPages()[getCurrentPages().length - 1] || {
    query: {},
  };
  return `${route}${
    Object.keys(query).length ? `?${query?.tostring?.()}` : ''
  }`;
};
export default Index;
