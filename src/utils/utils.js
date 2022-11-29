export function orderItemsAscendingStr(items, filterName) {
  return [...items].sort((a, b) => (a[filterName] > b[filterName] ? 1 : -1));
}

const utils = {
  orderItemsAscendingStr,
};

export default utils;
