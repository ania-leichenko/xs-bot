
const dashboard = require('../PO/dashboard_po');
const dash = new dashboard();

class DashboardActions {
    async OpenEAM() {
        await dash.EAM.waitForClickable(2000);
        await dash.EAM.click();
    }
    async OpenBS() {
        await dash.BS.waitForClickable(2000);
        await dash.BS.click();
    }
    async OpenSC() {
        await dash.SC.waitForClickable(2000);
        await dash.SC.click();
    }
    async OpenSLC() {
        await dash.SLC.waitForClickable(2000);
        await dash.SLC.click();
    }
    async Logout() {
        await dash.Menu.waitForClickable(2000);
        await dash.Menu.click();
        await dash.Logout.waitForClickable(2000);
        await dash.Logout.click();
    }
}

module.exports = DashboardActions;
