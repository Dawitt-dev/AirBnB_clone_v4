/* global s */
$(document).ready(function() {
    const amenities = {};

    $('input[type="checkbox"]').change(function() {
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
