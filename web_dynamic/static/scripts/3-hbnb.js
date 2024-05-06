$(document).ready(function () {
  const amenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }

    const amenitiesList = Object.values(amenities).join(', ');
    $('.Amenities h4').text(amenitiesList); // Corrected selector
  });
});

// Make a GET request to the API status endpoint
fetch('http://0.0.0.0:5001/api/v1/status/')
  .then(response => response.json())
  .then(data => {
    // Get the div#api_status element
    const apiStatusDiv = document.querySelector('div#api_status');

    // Check if the status is "OK"
    if (data.status === 'OK') {
      // Add the class "available" to the div#api_status
      apiStatusDiv.classList.add('available');
    } else {
      // Remove the class "available" from the div#api_status
      apiStatusDiv.classList.remove('available');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

$(document).ready(function () {
  // Make a POST request to the places_search API endpoint
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      // Loop through the results and create article tags for each place
      data.forEach(function (place) {
        // Create the article tag representing a place
        const article = $('<article>');

        // Populate the article with place information
        const titleBox = $('<div class="title_box">');
        titleBox.append($('<h2>').text(place.name));
        titleBox.append($('<div class="price_by_night">').text('$' + place.price_by_night));

        const information = $('<div class="information">');
        information.append($('<div class="max_guest">').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '')));
        information.append($('<div class="number_rooms">').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '')));
        information.append($('<div class="number_bathrooms">').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')));

        const description = $('<div class="description">').text(place.description);

        // Append the article to the section.places
        article.append(titleBox);
        article.append(information);
        article.append(description);
        $('.places').append(article);
      });
    },
    error: function (xhr, status, error) {
      console.error('Error:', error);
    }
  });
});
