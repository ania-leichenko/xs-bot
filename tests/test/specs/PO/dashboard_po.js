
class Dashboard {

    get TenantName () {return $('.styles_profileName__ob2HB')};
    get EAM () {return $('a[href="/eam"]')};
    get BS () {return $('a[href="/bs"]')};
    get SC () {return $('a[href="/sc"]')};
    get SLC () {return $('a[href="/slc"]')};
    get Menu () {return $('img[src="/static/media/menu.e13479af39489dad55980a36b77b39e6.svg"]')};
    get Logout () {return $('button[class="styles_dropdownBtn__TkE8S"]')};
    get Logo () {return $('img[alt="logo"]')};

}
module.exports = Dashboard;

