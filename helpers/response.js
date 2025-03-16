const successReponse = (res, message, data = {}, statusCode = 200) => {
  const ret = { message, data };
  res.status(statusCode);
  res.send(ret);
};

const errorResponse = (res, message, statusCode = 400) => {
  const ret = { message };
  res.status(statusCode);
  res.send(ret);
};

module.exports = {
  successReponse,
  errorResponse,
};
