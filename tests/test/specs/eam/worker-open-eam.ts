describe('Worker with permissions', async () => {
  it('can open EAM', async () => {
    try {
      browser.url('/');

      $('input[name="tenantName"]').setValue('MASTERrich');
      $('input[name="workerName"]').setValue('Bob');
      $('input[name="password"]').setValue(
        'e0af9b82-6b19-450a-bfce-fa22cfa38b0f',
      );

      const submit = $('button[type="submit"]');
      await submit.click();
      await submit.addValue('Enter');

      await browser.pause(1000);

      const eam = await $('a[href="/eam"]');
      await eam.click();

      await browser.pause(1000);

      //////////////////----CHECK---////////////////////////
      const addWorker = await $('a[href="/eam/create-worker"]');
      let check = await addWorker.isExisting();

      console.log(check + 'FROG');
      assert.equal(check, true);
    } catch (err) {
      console.log(err, '__ERROR__');
    }
  });
});
