$(document).ready(function() {
    // Function to make a POST request to places_search with the list of checked amenities
    function searchWithAmenities() {
        // Get the list of checked amenities
        var checkedAmenities = $('input[type="checkbox"]:checked')
            .map(function() {
                return $(this).data('id');
            })
            .get();

        // Make a POST request to places_search with the list of checked amenities
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: checkedAmenities }),
            success: function(data) {
                // Clear existing articles
                $('.places').empty();

                // Loop through the results and create article tags for each place
                data.forEach(function(place) {
                    var article = $('<article>');
                    var titleBox = $('<div class="title_box">');
                    var information = $('<div class="information">');

                    titleBox.append($('<h2>').text(place.name));
                    titleBox.append($('<div class="price_by_night">').text('$' + place.price_by_night));

                    information.append($('<div class="max_guest">').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '')));
                    information.append($('<div class="number_rooms">').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '')));
                    information.append($('<div class="number_bathrooms">').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')));

                    article.append(titleBox);
                    article.append(information);
                    article.append($('<div class="description">').text(place.description));

                    $('.places').append(article);
                });
            },
            error: function(_, _, error) {
                console.error('Error:', error);
            }
        });
    }

    // Bind click event to the button to trigger search with amenities
    $('button').click(function() {
        searchWithAmenities();
    });
});

