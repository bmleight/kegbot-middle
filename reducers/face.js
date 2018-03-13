const FaceTypes = require('../action-types/face');
const Deeply = require('kegbot-middle/utils/deeply');

const internals =  {
    // mock getting this from the api for now
    initial: () => ({
        face: null,
        isRunning: false
    })
};

// Reducer
module.exports = (state, action) => {

    state = state || internals.initial();

    switch (action.type) {

        case FaceTypes.FACE_DETECT:

            return Deeply(state)
                .set('face', action.payload)
                .value()
            ;

        case FaceTypes.FACE_DETECT_TOGGLE:

            return Deeply(state)
                .set('isRunning', !state.isRunning)
                .value()
            ;

    }

    return state;
};
