import React, { Component } from 'react';

class ProgressArc extends Component {
	constructor(props) {
		super(props);
		this.canvas = React.createRef();
	}
	componentDidMount() {
		this.drawCircleCanvas();
	}
	componentDidUpdate() {
		this.drawCircleCanvas();
	}
	drawCircleCanvas = () => {
		const ctx = this.canvas.current.getContext("2d");
		const { canvasSize, percent } = this.props;
		ctx.clearRect(0, 0, canvasSize, canvasSize); //czyszczenie obszaru
		ctx.fillStyle = 'rgb(299, 100, 0, .3)'; //color zawartości 1
		ctx.fillRect(0, 0, canvasSize, canvasSize); //obszar zawartości
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = 'rgb(100, 0, 00)';
		ctx.lineWidth = canvasSize / 20;
		ctx.lineCap = "round";
		let ringPercent = percent < 0 ? 0 : (2 / 100) * percent;
		const x = canvasSize / 2;
		const y = x;
		const radius = canvasSize / 2.5;
		ctx.arc(x, y, radius, 0, ringPercent * Math.PI);
		ctx.stroke();
		console.log(ringPercent);
	}
	render() {
		const { canvasSize } = this.props;
		return (
			<canvas ref={this.canvas} width={canvasSize} height={canvasSize} />
		)
	}
}
export default ProgressArc;