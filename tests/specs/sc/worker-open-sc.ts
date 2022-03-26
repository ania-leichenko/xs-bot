import * as assert from 'assert';

describe('Worker with permissions', async () => {
  it('can open SC', async () => {
    browser.url('/');

    $('input[name="tenantName"]').setValue('MASTERrich');
    $('input[name="workerName"]').setValue('Bob');
    $('input[name="password"]').setValue(
      'e0af9b82-6b19-450a-bfce-fa22cfa38b0f',
    );

    const submit = $('button[type="submit"]');
    await submit.click();

    browser.pause(1000);

    const sc = await $('a[href="/sc"]');
    await sc.click();
    await sc.addValue('Enter');

    browser.pause(1000);

    //////////////////----CHECK---////////////////////////
    const addInstance = await $('a[href="/sc/configurate-instance"]');
    const check = await addInstance.isExisting();

    assert.equal(check, true);
  });
});
