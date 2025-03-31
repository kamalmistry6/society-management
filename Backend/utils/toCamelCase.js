const toCamelCase = (rows) => {
  return rows.map((row) => {
    const camelCaseRow = {};
    for (let key in row) {
      const camelKey = key.replace(/_([a-z])/g, (_, char) =>
        char.toUpperCase()
      );
      camelCaseRow[camelKey] = row[key];
    }
    return camelCaseRow;
  });
};

module.exports = { toCamelCase };
