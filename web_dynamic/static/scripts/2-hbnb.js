$(document).ready(function() {
    let amenityIds = [];

    $('input[type="checkbox"]').change(function() {
        if (this.checked) {
            amenityIds.push($(this).data('id'));
        } else {
            const index = amenityIds.indexOf($(this).data('id'));
            if (index > -1) {
                amenityIds.splice(index, 1);
            }
        }
        $('div.amenities h4').text(amenityIds.join(', '));
    });


    $.ajax({
        type: 'GET',
        url: 'http://0.0.0.0:5001/api/v1/status/',
        success: function(response) {

            if (response.status === 'OK') {

                $('#api_status').addClass('available');
            } else {

                $('#api_status').removeClass('available');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error occurred while fetching API status:', error);
        }
    });
});
