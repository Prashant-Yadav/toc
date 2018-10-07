const ToC = require('./main').ToC;
const Service = ToC.Service();
const Util = ToC.Util();

function loadContents() {
    
  // show loader
  Util.toggleDisplay('loader', true);

  // Hide Content
  Util.toggleDisplay('content', false);

  // Handle response of upper level information from api
  const success = (data) => {
    for ( let item of data) {
      $('#content').append(
        `<div id="upper-item-${item.id}" class="chapter">
          <div class='chapter-title'>
            ${item.title} <span>( ${item.childrenCount} concepts )</span>
          </div>
        </div>`
      );

      $(`#upper-item-${item.id} .chapter-title`).bind('click', item, listInnerItems);
    }

    // Hide loader
    Util.toggleDisplay('loader', false);

    // Show Content
    Util.toggleDisplay('content', true);
  };

  // Fetch 1st level data
  const url = 'maths';
  Service.getRequest(url, function(err, data) {
    if (err === null) {
      success(data);
    }  
  });

}

function listInnerItems({data: item}) {

  const upperItemId = `#upper-item-${item.id}`;

  if ($(upperItemId).has(`.inner-content`).length) {
    
    // already items loaded
    $(`${upperItemId} .inner-content`).remove();
    $(upperItemId).removeClass('active');
    return;

  }

  // Handle inner level items fetched from api 
  const success = (data, itemId) => {
    const upperItemId = `#upper-item-${item.id}`;

    let innerContent = `<div class="inner-content">`;
    for (let lesson of data[itemId]) {
      const itemStructure = `<div class="lesson"><img src="assets/images/lesson.png" /> ${lesson.title}</div>`;
      innerContent += itemStructure;
    }

    innerContent += `</div>`;

    $(upperItemId).append(innerContent);

    $(upperItemId).addClass('active');
  };

  // Fetch inner level items
  const url = `maths/section/${item.id}`;
  Service.getRequest(url, function(err, data) {
    if (err === null) {
      success(data, item.id);
    }
  });
}

$(document).ready(function() {
  loadContents();
});
