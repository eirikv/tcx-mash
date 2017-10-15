const tcxService = require('../service/tcx-service');

module.exports = function(app) {
  app.get('/tcx', async (req, res) => {

    const heartrate = await tcxService.getTcx(
      'activity-polar.tcx',
      'activity-garmin.tcx',
    );

    res.json(heartrate);
  });
};
