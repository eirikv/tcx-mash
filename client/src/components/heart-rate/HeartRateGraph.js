import React from 'react';

const PLOT_COLORS = ['red', 'green'];

class HearRateGraph extends React.Component {
    constructor() {
        super();

        this.onMouseMove = this.onMouseMove.bind(this);
    }

    componentDidMount() {
        this.canvas.addEventListener('mousemove', this.onMouseMove);
    }

    componentWillUnmount() {
        this.canvas.removeEventListener('mousemove', this.onMouseMove);
    }

    componentDidUpdate() {
        this.drawGraph();
    }

    onMouseMove(e) {
        const { height, width, plotPoints } = this.props;
        const { left } = this.canvas.getBoundingClientRect();
        const x = e.clientX - left;

        this.drawGraph();

        plotPoints.forEach((trackpoints, i) => {
            const plot = trackpoints.find(({ point }) => Math.abs(x - (point.x * width)) <= 2);

            if (plot) {
                this.drawDot(plot.point.x * width, plot.point.y * height, PLOT_COLORS[i]);
            }
        });
    }

    drawDot(x, y, color) {
        const ctx = this.canvas.getContext('2d');

        ctx.fillStyle = color;

        ctx.beginPath();

        ctx.arc(x, y, 4, 0, 2 * Math.PI);

        ctx.fill();
    }

    resetCanvas() {
        const {
            width,
            height,
        } = this.props;

        const ctx = this.canvas.getContext('2d');

        ctx.setTransform(1, 0, 0, 1, 0, 0); // Identity matrix
        ctx.clearRect(0, 0, width, height);

        ctx.translate(0, height);
        ctx.scale(1, -1);
    }

    drawLegends() {
        const {
            width,
            height,
        } = this.props;

        const ctx = this.canvas.getContext('2d');

        ctx.strokeStyle = 'gray';

        [0, 25, 50, 75, 100].forEach(point => {
            const pointPercentage = point/100;
            const yAxisPosition = pointPercentage * height;
            const xAxisPosition = pointPercentage * width;

            // For Y-Axis
            ctx.beginPath();
            ctx.moveTo(0, yAxisPosition);
            ctx.lineTo(width, yAxisPosition);
            ctx.stroke();
            ctx.closePath();

            // For X-Axis
            ctx.beginPath();
            ctx.moveTo(xAxisPosition, 0);
            ctx.lineTo(xAxisPosition, height);
            ctx.stroke();
            ctx.closePath();
        });
    }

    drawPoints() {
        const {
            width,
            height,
            plotPoints,
        } = this.props;

        const ctx = this.canvas.getContext('2d');

        plotPoints.forEach((trackpoints, i) => {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.strokeStyle = PLOT_COLORS[i];

            trackpoints.forEach(({ point }) => {
                const x = point.x * width;
                const y = point.y * height;

                ctx.lineTo(x, y);
            });

            ctx.stroke();
            ctx.closePath();
        });
    }

    drawGraph() {
        this.resetCanvas();
        this.drawLegends();
        this.drawPoints();
    }

    render() {
        const {
            width,
            height,
        } = this.props;

        return (
            <canvas
                ref={(canvas) => { this.canvas = canvas; }}
                height={height}
                width={width}
            />
        );
    }
}

export default HearRateGraph;