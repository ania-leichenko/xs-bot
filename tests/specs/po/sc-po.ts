class SC {

    get AddInstance_Button (): ReturnType<typeof $> {
        return $('a[href="/sc/configurate-instance"]');
    }

    get Reload_Button (): ReturnType<typeof $> {
        return $('button[class="styles_button__AHHQA"]');
    }

    get Cancel_Button (): ReturnType<typeof $> {
        return $('a[href="/sc"]');
    }

    get Create_Button (): ReturnType<typeof $> {
        return $('button[type="submit"]');
    }

    get InstanceName_Field (): ReturnType<typeof $> {
        return $('input[name="name"]');
    }

    get OS_Field (): ReturnType<typeof $> {
        return $('input[name="operationSystemId"]');
    };

    get OSFieldShown (): ReturnType<typeof $> {
        return $('input[id="react-select-2-input"]');
    };

    get ubuntu18 (): ReturnType<typeof $> {
        return $('div[id="react-select-2-option-0"]');
    };

    get UserData_Field (): ReturnType<typeof $> {
        return $('textarea[name="userData"]');
    }

    get Bucket (): ReturnType<typeof $> {
        return $('img[src="/static/media/delete-icon.98786469ba52bc63501716a59174d53c.svg"]');
    }

    get ConfirmDeleting (): ReturnType<typeof $> {
        return $('button[class="styles_btn__9DPcn styles_btnColorOrange__Jnd2G styles_btnStyleFilled__UVKdC styles_button__PuOil"]')
    }

    get TableCell (): ReturnType<typeof $> {
        return $('tr>td[role="cell"]');
    }

    get SuccessIcon (): ReturnType<typeof $> {
        return $('div[class="notification_check__FUZIb"]')
    }

    get Message (): ReturnType<typeof $> {
        return $('div[class="rrt-text"]')
    }

    get EditIcon (): ReturnType<typeof $> {
        return $('img[alt="Edit"]')
    }
}

export { SC };
