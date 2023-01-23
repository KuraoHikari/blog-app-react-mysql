function getPagination(page, size) {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
}

function getPagingData(rows, count, page, limit) {
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(count / limit);

  return { count, rows, totalPages, currentPage };
}

module.exports = { getPagination, getPagingData };
