class Dashboard {
  get TenantName(): ReturnType<typeof $> {
    return $('.styles_profileName__ob2HB');
  }

  get EAM(): ReturnType<typeof $> {
    return $('a[href="/eam"]');
  }

  get BS(): ReturnType<typeof $> {
    return $('a[href="/bs"]');
  }

  get SC(): ReturnType<typeof $> {
    return $('a[href="/sc"]');
  }

  get SLC(): ReturnType<typeof $> {
    return $('a[href="/slc"]');
  }

  get Menu(): ReturnType<typeof $> {
    return $(
      'img[src="/static/media/menu.e13479af39489dad55980a36b77b39e6.svg"]',
    );
  }

  get Logout(): ReturnType<typeof $> {
    return $('button[class="styles_dropdownBtn__TkE8S"]');
  }

  get Logo(): ReturnType<typeof $> {
    return $('img[alt="logo"]');
  }
}

export { Dashboard };
