const TrackpointModel = require('../models/TrackpointModel');
const TrackpointCollection = require('../models/TrackpointCollection');

const createTrackpoint = ({ Time, HeartRateBpm }) =>
    new TrackpointModel({
        heartRate: HeartRateBpm[0].Value[0],
        time: Time[0],
    });

const mapTrackpoints = ({ Trackpoint }) =>
    Trackpoint.map((trackpoint, index) => createTrackpoint(trackpoint));

const mapTracks = ({ Track }) => Track
      .map(track => mapTrackpoints(track))
      .reduce((acc, item) => acc.concat(item), []);

const mapLaps = ({ Activity }) => Activity[0].Lap
      .map(lap => mapTracks(lap))
      .reduce((acc, item) => acc.concat(item), []);

module.exports = function({ TrainingCenterDatabase }) {
    const activities = TrainingCenterDatabase.Activities;
    const deviceName = activities[0].Activity[0].Creator[0].Name[0];
    const trackpoints =  activities.map(activity => mapLaps(activity))[0];

    return new TrackpointCollection({ trackpoints, deviceName });
};
