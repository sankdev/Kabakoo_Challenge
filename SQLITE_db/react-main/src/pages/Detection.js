// import React, { useEffect, useRef } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import cv from 'opencv4nodejs';

// function Detection() {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     async function detectObjects() {
//       const model = await tf.loadGraphModel('model.json');
//       const cap = new cv.VideoCapture(0);

//       setInterval(() => {
//         const frame = cap.read();
//         const tensor = tf.browser.fromPixels(frame);

//         const predictions = model.predict(tensor.expandDims());

//         predictions.array().then((predictions) => {
//           const objects = predictions.filter((prediction) => prediction[0] > 0.9);
//           objects.forEach((object) => {
//             const [classId, score, x, y, w, h] = object.slice(1);
//             frame.drawRectangle(new cv.Rect(x, y, w, h), new cv.Vec(0, 255, 0), 2);
//           });

//           cv.imshow('video', frame);
//           tensor.dispose();
//         });
//       }, 16);
//     }

//     detectObjects();
//   }, []);

//   return (
//     <div>
//       <video ref={videoRef} id="video" width="640" height="480" />
//     </div>
//   );
// }

// export default Detection;
