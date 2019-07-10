const yelpKey = "Oi573GrBv4w13yNAYNhpBCjWDx3IZIYGsxLn7vvj0oIXNkN-NagE5aB8oRgnC0-xSyac9xx9J39HCKSRf8bK6t6gEc7Y7zVbE1hGA47T-5dFyrMeJM0V2EZEm-cbXXYx";
const yelpURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

function dataReturn(loc){
  console.log('dataReturn working');
  const yelpParams = {
    location: loc,
  };

  const yelpString = formatQueryParams(yelpParams);
  // const eventString = formatQueryParams(eventParams)

  const urlYelp = yelpURL + '?sortby=rating&limit=50&term=food&' + yelpString;
  // const urlEvent = eventURL + '?' + eventString;

  console.log(urlYelp);

  const options = {
    headers: {
      'authorization': `Bearer ${yelpKey}`,
    }
  };

  /* Yelp API call */
  fetch(urlYelp, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#query').css({'display': 'none'});
  $(".grid").empty();
  for (let i = 0; i < responseJson.businesses.length; i++){
    console.log(responseJson.businesses[i].name);
    $('.grid').append(`<a href="${responseJson.businesses[i].url}"><img src="${responseJson.businesses[i].image_url}" class='thumb'></a>`);
    let cw = $('.thumb').width();
    $('.thumb').css({'height':cw+'px'});
    $('.search2').removeClass('hidden');
    $('.submit-button').removeClass('hidden');
  }
}

function formListen() {
  console.log('formListen working')
  $('body').on('click', '.submit-button', function(event){
    event.preventDefault();
    const loc = $('#location').val();
    // const spec = $('#spec').val();
    dataReturn(loc);
  })
}

function handlePage(){
  formListen();
}

$(handlePage);
