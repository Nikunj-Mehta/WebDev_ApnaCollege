class ExpressError extends Error { // Inheritance
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = ExpressError;