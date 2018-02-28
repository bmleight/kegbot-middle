const WebClient = require('../utils/web-client');
const BeerTypes = require('../action-types/beer');

const internals = {};
const actions = exports;

exports.beersLoadBegin = () => {

    return {
        type: BeerTypes.BEERS_LOAD_BEGIN
    };
};

exports.beersLoadSuccess = (beers) => {

    return {
        type: BeerTypes.BEERS_LOAD_SECCESS,
        payload: beers
    };
};

exports.beersLoadError = (error) => {

    return {
        type: BeerTypes.BEERS_LOAD_ERROR,
        payload: { error },
        error: true
    };
};

exports.loadBeer = () => {

    return (dispatch) => {

        dispatch(actions.beersLoadBegin());

        const getBeers = WebClient.get('/beers/on-tap');

        getBeers
        .then(({ data }) => {

            dispatch(actions.beersLoadSuccess(data));
        })
        .catch((error) => {

            dispatch(actions.beersLoadError(error));
        });

        return getBeers;
    };
};

exports.rateBeer = (id, rating) => {

    return {
        type: BeerTypes.BEER_RATE,
        id,
        rating
    };
};
