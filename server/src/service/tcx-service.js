const { getParsedFile } = require('../utils/file-utils');
const { formatTime } = require('../utils/time-utils');
const tcxTranslator = require('../translators/tcx-translator');

const _getXAxisLabels = deltaTime => {
  const ratio = deltaTime/100;
  return [0, 25, 50, 75, 100].map(rate => formatTime(rate * ratio));
};

const _getYAxisLabels = (minHeartRate, deltaHr) => {
  const ratio = deltaHr/100;
  return [0, 25, 50, 75, 100].map(rate => {
    const hr = rate * ratio + minHeartRate;
    return Math.round(hr);
  });
};

async function getTcx(...fileNames) {
  const files = await Promise.all(
    fileNames.map(
      async fileName => await getParsedFile(fileName)
    )
  );

  const trackpoints = files.map(file => tcxTranslator(file));

  const sessionStartTimestamp = Math.min.apply(null, trackpoints.map(trackpoint => trackpoint.startTimestamp));
  const sessionEndTimestamp = Math.max.apply(null, trackpoints.map(trackpoint => trackpoint.endTimestamp));
  const sessionMinHeartRate = Math.min.apply(null, trackpoints.map(trackpoint => trackpoint.minHeartRate));
  const sessionMaxHeartRate = Math.max.apply(null, trackpoints.map(trackpoint => trackpoint.maxHeartRate));

  const sessionDeltaTime = sessionEndTimestamp - sessionStartTimestamp;
  const sessionDeltaHr = sessionMaxHeartRate - sessionMinHeartRate;

  const plotPoints = trackpoints.map(collection => collection.getAsPlotPoints({
    sessionStartTimestamp,
    sessionMinHeartRate,
    sessionDeltaTime,
    sessionDeltaHr,
  }));

  return {
    xAxisLabels: _getXAxisLabels(sessionDeltaTime),
    yAxixLabels: _getYAxisLabels(sessionMinHeartRate, sessionDeltaHr),
    plotPoints,
  };
}

module.exports = {
  getTcx,
};
