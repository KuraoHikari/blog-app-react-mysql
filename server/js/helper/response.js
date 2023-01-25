function SuccessResponse(data) {
  return {
    status: true,
    message: "Success",
    errors: null,
    data: data,
  };
}
function FailedResponse(errors) {
  return {
    status: false,
    message: "Failed",
    errors: errors,
    data: null,
  };
}

module.exports = { SuccessResponse, FailedResponse };
