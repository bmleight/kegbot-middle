const FaceTypes = require('../action-types/face');

const internals = {};
const actions = exports;

internals.fadeFace = null;

exports.faceDetect = (faceLocation) => {

    return (dispatch) => {

        if (internals.fadeFace) {
            clearTimeout(internals.fadeFace);
        }

        // TODO set timeout to fire face_un_detect
        internals.fadeFace = setTimeout(() => {

            internals.fadeFace = null;

            dispatch({
                type: FaceTypes.FACE_DETECT,
                payload: null
            });
        }, 500);

        dispatch({
            type: FaceTypes.FACE_DETECT,
            payload: faceLocation
        });
    };
};

exports.toggleFaceDetection = () => {

  return {
      type: FaceTypes.FACE_DETECT_TOGGLE
  };
}
