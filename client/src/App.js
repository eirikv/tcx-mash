import React from 'react';

import HeartRateCanvas from '~/components/heart-rate';

export default ({ heartRateData }) => {
    return (
        <div className="section-wrapper">
            <div className="content-container">
                <HeartRateCanvas
                    {...heartRateData}
                />
            </div>
        </div>

    );
}

