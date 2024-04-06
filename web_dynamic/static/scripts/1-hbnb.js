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
});