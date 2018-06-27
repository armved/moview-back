class Response {
  constructor(input) {
    if (input) {
      this.service = {
        success: input.success,
        errorCode: input.errorCode || 0,
        errorMessage: input.errorMessage || '',
      };

      this.payload = input.payload || {};
    }
  }

  toJSON() {
    return {
      service: this.service,
      payload: this.payload,
    }
  }
}

module.exports = Response;