export const getCurrentPageUrl = <
  T extends {
    [key in string]: string;
  }
>() => {
  const pages = getCurrentPages?.(); //获取加载的页面
  if (!pages) {
    return {};
  }
  const currentPage = pages[pages.length - 1]; //获取当前页面的对象
  const queryStr = Object.entries(currentPage?.options)
    .map(([key, item]) => `${key}=${item}`)
    .join('&');
  return {
    route: currentPage?.route as string,
    options: currentPage?.options as T,
    url: `${currentPage?.route}${queryStr ? '?' + queryStr : ''}`,
  };
};

export default getCurrentPageUrl;
