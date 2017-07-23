class TrackpointCollection {

    constructor({ trackpoints, deviceName }) {
      this.deviceName = deviceName;
      this.trackpoints = trackpoints || [];

      this.maxHeartRate = this.trackpoints.reduce((max, item) =>
        item.heartRate > max ? item.heartRate : max, 0
      );

      this.minHeartRate = this.trackpoints.reduce((min, item) =>
        item.heartRate < min ? item.heartRate : min, this.maxHeartRate
      );

      this.endTimestamp = this.trackpoints.reduce((end, item) =>
        item.timestamp > end ? item.timestamp : end, 0
      );

      this.startTimestamp = this.trackpoints.reduce((start, item) =>
        item.timestamp < start ? item.timestamp : start, this.endTimestamp,
      );
    }

    getAsPlotPoints(opt) {
      return this.trackpoints.map(item => item.getAsPlotPoint(opt));
    }

}

module.exports = TrackpointCollection;
