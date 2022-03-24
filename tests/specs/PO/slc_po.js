
class SLC {

    get Name_Field () {return $('input[name="name"]')};
    get Save_Button () {return $('button[type="submit"]')};
    get AddFunction_Button () {return $('a[href="/slc/configurate-function"]')};
    get Logo () {return $('img[alt="logo"]')};
    get LastFunction () {return $$('.styles_tableCell__C6dnh')};
    get ErrorMessage () {return $('#dialogDesk-9226')};
    get Delete_Button () {return $('img[alt="Delete"]')};
    get Edit_Button () {return $('img[alt="Edit"]')};
    get Reload_Button () {return $('img[alt="Reload"]')};
}
module.exports = SLC;
