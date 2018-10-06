const ToC = require('./main').ToC;
const Service = ToC.Service();

(function() {
    
  // show loader
  document.getElementById('loader').classList.add('show');

  // Hide Content
  document.getElementById('content').classList.add('hide');


  try {
    // Fetch 1st level data
    const url = 'maths';
    Service.getRequest(url, function(err, data) {
      if (err === null) {
        console.log(data);
      }  
    });

  } catch(err) {
    console.log(err);
  }
    
})();