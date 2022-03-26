import { Dashboard } from '../po/dashboard-po';

const dash = new Dashboard();

class DashboardActions {
  async OpenEAM(): Promise<void> {
    await dash.EAM.waitForClickable({
      timeout: 2000,
    });
    await dash.EAM.click();
  }

  async OpenBS(): Promise<void> {
    await dash.BS.waitForClickable({
      timeout: 2000,
    });
    await dash.BS.click();
  }

  async OpenSC(): Promise<void> {
    await dash.SC.waitForClickable({
      timeout: 2000,
    });
    await dash.SC.click();
  }

  async OpenSLC(): Promise<void> {
    await dash.SLC.waitForClickable({
      timeout: 2000,
    });
    await dash.SLC.click();
  }

  async Logout(): Promise<void> {
    await dash.Menu.waitForClickable({
      timeout: 2000,
    });
    await dash.Menu.click();
    await dash.Logout.waitForClickable({
      timeout: 2000,
    });
    await dash.Logout.click();
  }
}

export { DashboardActions };
