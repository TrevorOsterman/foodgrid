const yelpKey = "Oi573GrBv4w13yNAYNhpBCjWDx3IZIYGsxLn7vvj0oIXNkN-NagE5aB8oRgnC0-xSyac9xx9J39HCKSRf8bK6t6gEc7Y7zVbE1hGA47T-5dFyrMeJM0V2EZEm-cbXXYx";
const yelpURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';

/* Formats parameters for API call */
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

/* API call */
function dataReturn(loc){
  const yelpParams = {location: loc,};
  const yelpString = formatQueryParams(yelpParams);
  const urlYelp = yelpURL + '?sortby=rating&limit=50&term=food&' + yelpString;
  const options = {
    headers: {'authorization': `Bearer ${yelpKey}`,}
  };

  fetch(urlYelp, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => alert(`uh oh, looks like that was a 'bad request', which means you're probably typing gibberish. how about we try a good request.`));
}

/* Hide landing page, display results using jQuery */
function displayResults(responseJson) {
  $('#query').css({'display': 'none'});
  $(".grid").empty();
  for (let i = 0; i < responseJson.businesses.length; i++){
    $('.grid').append(`<a class='thumb' href="${responseJson.businesses[i].url}" target='_blank'><img src="${responseJson.businesses[i].image_url}" class='thumb' alt='biz-thumb'></a>`);
    let cw = $('.thumb').width();
    $('.thumb').css({'height':cw+'px'});
    $('.search2').removeClass('hidden');
    $('#search-link').removeClass('hidden');
    $('#goback').removeClass('hidden');
  }
}

// Search bar functionality
function searchListen() {
  $('body').on('click', '#search-link', function(event){
    event.preventDefault();
    const loc = $('#searchbar').val();
    dataReturn(loc);
  })
}

// Initial form listener
function formListen() {
  $('body').on('click', '.submit-button', function(event){
    event.preventDefault();
    const loc = $('#location').val();
    dataReturn(loc);
  })
}

function handlePage(){
  formListen();
  searchListen();
}

$(handlePage);
