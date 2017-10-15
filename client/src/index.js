import React from 'react';
import ReactDOM from 'react-dom';

import css from '~/less/styles.less';
import { get } from '~/utils/fetch-util';

import App from './App';

const bootstrap = async () => {
    const heartRateData = await get('/tcx');

    ReactDOM.render(
        <App heartRateData={heartRateData} />,
        document.getElementById('root'),
    );
};

bootstrap();