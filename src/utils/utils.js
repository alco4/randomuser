export function orderItemsAscendingStr(items, filterName) {
  return [...items].sort((a, b) => (a[filterName] > b[filterName] ? 1 : -1));
}

export function orderItemsAscendingNum(items, filterName) {
  return [...items].sort((a, b) => a[filterName] - b[filterName]);
}

const utils = {
  orderItemsAscendingStr,
};

export default utils;
