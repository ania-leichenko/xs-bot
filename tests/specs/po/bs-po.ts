class BS {
    
    get AddSpace_Button (): ReturnType<typeof $> {
        return $('a[href="/bs/create-space"]')
    }

    get Reload_Button (): ReturnType<typeof $> {
        return $('button[class="styles_button__AHHQA"]')
    }

    get SpaceName_Field (): ReturnType<typeof $> {
        return $('input[name="name"]')
    }

    get Cancel_Button (): ReturnType<typeof $> {
        return $('a[href="/bs"]')
    }

    get Create_Button (): ReturnType<typeof $> {
        return $('button[type="submit"]')
    }

    get Bucket (): ReturnType<typeof $> {
        return $('img[src="/static/media/delete-icon.98786469ba52bc63501716a59174d53c.svg"]')
    }

    get ConfirmDeleting (): ReturnType<typeof $> {
        return $('button[class="styles_btn__9DPcn styles_btnColorOrange__Jnd2G styles_btnStyleFilled__UVKdC styles_button__PuOil"]')
    }

    get Bucket_Link (): ReturnType<typeof $> {
        return $('a[class="styles_link__dur7p"]')
    }

    get File_Input (): ReturnType<typeof $> {
        return $('input[type="file"]')
    }

    get SuccessIcon (): ReturnType<typeof $> {
        return $('div[class="notification_check__FUZIb"]')
    }

    get Message (): ReturnType<typeof $> {
        return $('div[class="rrt-text"]')
    }
    
    get TableCell (): ReturnType<typeof $> {
        return $('tr>td[role="cell"]')
    }

}

export { BS };
