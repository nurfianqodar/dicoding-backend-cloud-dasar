class ApiError extends Error {
  /**
   * For Handle Error In App
   * @param {string} message
   * @param {number} statusCode
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = { ApiError };
