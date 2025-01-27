const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_DATA_LIMIT = 0;

const getPagination = (pageNumber, dataLimit) => {
  const page = Math.abs(pageNumber) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(dataLimit) || DEFAULT_DATA_LIMIT;

  const offset = (page - 1) * limit;

  return { offset, limit };
};

module.exports = getPagination;
