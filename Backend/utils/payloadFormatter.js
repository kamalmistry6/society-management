const formatPayload = (payload) => {
  const formatted = {};
  for (const key in payload) {
    const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    formatted[snakeKey] = payload[key];
  }
  return formatted;
};

module.exports = { formatPayload };
