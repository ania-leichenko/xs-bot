import { createAction } from '@reduxjs/toolkit';

const pushHistory = createAction<string>('navigation/pushHistory');
export { pushHistory };
