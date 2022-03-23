describe('Worker with permissions', async () => {
  it('can open SLC', async () => {
    try {
      browser.url('/');
      $('input[name="tenantName"]').setValue('MASTERrich');
      $('input[name="workerName"]').setValue('Bob');
      $('input[name="password"]').setValue(
        'e0af9b82-6b19-450a-bfce-fa22cfa38b0f',
      );

      const submit = $('button[type="submit"]');
      await submit.click();

      browser.pause(1000);

      const slc = await $('a[href="/slc"]');
      await slc.click();
      await slc.addValue('Enter');

      browser.pause(1000);

      //////////////////----CHECK---////////////////////////
      const addFunction = await $('a[href="/slc/configurate-function"]');
      let check = await addFunction.isExisting();

      console.log(check + 'FROG');
      assert.equal(check, true);
    } catch (err) {
      console.log(err, '__ERROR__');
    }
  });
});
