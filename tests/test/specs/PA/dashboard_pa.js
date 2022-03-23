
const dashboard = require('../PO/dashboard_po');
const dash = new dashboard();

class DashboardActions {
OpenEAM() {
        dash.EAM.waitForClickable(2000);
        dash.EAM.click();
    }
    OpenBS() {
        dash.BS.waitForClickable(2000);
        dash.BS.click();
    }
    OpenSC() {
        dash.SC.waitForClickable(2000);
        dash.SC.click();
    }
    OpenSLC() {
        dash.SLC.waitForClickable(2000);
        dash.SLC.click();
    }
    Logout() {
        dash.Menu.waitForClickable(2000);
        dash.Menu.click();
        dash.Logout.waitForClickable(2000);
        dash.Logout.click();
    }

}

module.exports = DashboardActions;
