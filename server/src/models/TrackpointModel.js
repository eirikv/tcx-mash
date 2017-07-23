const { formatTime } = require('../utils/time-utils');

class TrackpointModel {

    constructor({ heartRate, time }) {
        this.time = new Date(time);
        this.timestamp = this.time.getTime();
        this.heartRate = parseInt(heartRate, 10);
    }

    getAsPlotPoint({ sessionStartTimestamp, sessionDeltaTime, sessionMinHeartRate, sessionDeltaHr }) {
      const difftime = this.timestamp - sessionStartTimestamp;
      
      return {
        heartRate: this.heartRate,
        time: formatTime(difftime),
        point: {
          x: difftime / sessionDeltaTime,
          y: (this.heartRate - sessionMinHeartRate) / sessionDeltaHr,
        },
      };
    }

}

module.exports = TrackpointModel;
