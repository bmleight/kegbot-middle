const BeerTypes = require('kegbot-middle/action-types/beer');
const Deeply = require('kegbot-middle/utils/deeply');

const internals =  {
    // mock getting this from the api for now
    initial: () => ({
        isLoading: false,
        error: null,
        all: {
            1: {
                id: 1,
                name: 'CloneZone IPA',
                abv: 6.3,
                ibus: 79,
                description: 'Galaxy and Mosaic hops contributes delicious citrusy and tropical flavor. Pleasantly hoppy with a dry finish that makes it endlessly enjoyable.',
                style: 'ipa',
                type: 'home-brew',
                image: require('static/orono-brewing-company-logo.png'),
                ratings: [],
                brewery: {
                    name: 'Brother\'s basement',
                    image: 'static/ozone-ipa.jpg'
                },
                cloneBeer: {
                    name: 'Ozone IPA',
                    image: '',
                    brewery: {
                        name: 'Orono Brewing Company',
                        image: 'static/orono-brewing-company-logo.png'
                    },
                    brewer: {
                        name: 'bmleight'
                    }
                }
            }
        }
    })
};

// Reducer
module.exports = (state, action) => {

    state = state || internals.initial();

    switch (action.type) {

        case BeerTypes.BEERS_LOAD_BEGIN:
            return Object.assign({}, state, {
                isLoading: true
            });

        case BeerTypes.BEERS_LOAD_SECCESS:
            return Object.assign({}, state, {
                isLoading: false,
                error: null,
                all: action.payload
            });

        case BeerTypes.BEERS_LOAD_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.payload
            });

        case BeerTypes.BEER_RATE:

            return Deeply(state)
                .push(`all.${action.id}.ratings`, parseFloat(action.rating))
                .value()
            ;

    }

    return state;
};
