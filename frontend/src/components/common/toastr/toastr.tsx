import { FC } from 'react';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const Toastr: FC = () => <ReduxToastr position="top-right" />;

export { Toastr };
