const ToC = require('./main').ToC;
const Util = ToC.Util();


ToC.Service = function() {

  const getRequest = function (url, done) {
    const apiUrl = Util.constants.BASE_ENDPOINT + url;
      
    try {
      var xhttp = new XMLHttpRequest();

      xhttp.open('GET', apiUrl, true);
      
      xhttp.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          done(null, JSON.parse(xhttp.responseText).response);
        } else {
          done(xhttp.responseText);
        }
      };

      xhttp.onerror = function() {
        done(JSON.parse(xhttp.responseText));
      };
      
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send();

    } catch(err) {
      throw err;
    }
  }

  return {
    getRequest,
  }

}
