import React from 'react';

import debounce from '~/utils/debounce';

import HeartRateGraph from './HeartRateGraph';

class HearRateCanvas extends React.Component {
    constructor() {
        super();

        this.state = {
            width: 0,
            height: 0,
        };

        this.setComponentSize = debounce(
            this.setComponentSize.bind(this),
            250,
        );
    }

    setComponentSize() {
        const { width, height } = this.graphContainer.getBoundingClientRect();

        this.setState({
            width,
            height,
        });
    }

    componentDidMount() {
        this.setComponentSize();
        window.addEventListener('resize', this.setComponentSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setComponentSize);
    }

    render() {
        const {
            width,
            height,
        } = this.state;

        const {
            plotPoints,
        } = this.props;

        return (
            <div
                className="canvas"
                ref={(container) => { this.graphContainer = container; }}
            >
                <div>
                    <span className="canvas__y-axis canvas__y-axis--0">0</span>
                    <span className="canvas__y-axis canvas__y-axis--25">25</span>
                    <span className="canvas__y-axis canvas__y-axis--50">50</span>
                    <span className="canvas__y-axis canvas__y-axis--75">75</span>
                    <span className="canvas__y-axis canvas__y-axis--100">100</span>
                </div>

                <div className="canvas__x-axis"></div>
                <HeartRateGraph
                    width={width}
                    height={height}
                    plotPoints={plotPoints}
                />
            </div>
        )
    }
}

export default HearRateCanvas;