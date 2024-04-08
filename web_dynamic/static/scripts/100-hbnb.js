$(document).ready(function () {
    const api = 'http://' + window.location.hostname;
    let amenities = {};
    let states = {};
    let cities = {};

    $('input[type="checkbox"]').change(function () {
        let dataId = $(this).data('id');
        let dataName = $(this).data('name');
        let type = $(this).data('type');

        if (this.checked) {
            if (type === 'amenity') {
                amenities[dataId] = dataName;
            } else if (type === 'state') {
                states[dataId] = dataName;
            } else if (type === 'city') {
                cities[dataId] = dataName;
            }
        } else {
            if (type === 'amenity') {
                delete amenities[dataId];
            } else if (type === 'state') {
                delete states[dataId];
            } else if (type === 'city') {
                delete cities[dataId];
            }
        }

        let allChecked = Object.values(amenities).concat(Object.values(states), Object.values(cities));
        if (allChecked.length === 0) {
            $('.locations h4').html('&nbsp;');
        } else {
            $('.locations h4').text(allChecked.join(', '));
        }
    });

    $('button').click(function () {
        $.ajax({
            url: api + ':5001/api/v1/places_search/',
            type: 'POST',
            data: JSON.stringify({
                amenities: Object.keys(amenities),
                states: Object.keys(states),
                cities: Object.keys(cities)
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                $('SECTION.places').append(data.map(place => {
                    return `<ARTICLE>
                              <DIV class="title">
                                <H2>${place.name}</H2>
                                <DIV class="price_by_night">
                                  ${place.price_by_night}
                                </DIV>
                              </DIV>
                              <DIV class="information">
                                <DIV class="max_guest">
                                  <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                                  </BR>
                                  ${place.max_guest} Guests
                                </DIV>
                                <DIV class="number_rooms">
                                  <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                                  </BR>
                                  ${place.number_rooms} Bedrooms
                                </DIV>
                                <DIV class="number_bathrooms">
                                  <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                                  </BR>
                                  ${place.number_bathrooms} Bathrooms
                                </DIV>
                              </DIV>
                              <DIV class="description">
                                ${place.description}
                              </DIV>
                            </ARTICLE>`;
                }));
            }
        });
    });
});