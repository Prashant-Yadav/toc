const ToC = require('./main').ToC;

ToC.Util = function () {

  const constants = {
    BASE_ENDPOINT: "http://localhost:8080/api/book/",
  }

  const toggleDisplay = function(elementId, show) {
    if (show) {
      $(`#${elementId}`).show();
    } else {
      $(`#${elementId}`).hide();
    }
  }

  return {
    constants,
    toggleDisplay,
  }
    
};