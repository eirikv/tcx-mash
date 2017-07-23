const tcxService = require('../service/tcx-service');

module.exports = function(app) {
  app.get('/tcx', async (req, res) => {

    const polar = await tcxService.getTcx(
      'activity-polar.tcx',
      'activity-garmin.tcx',
    );

    res.json(polar);
  });
};
