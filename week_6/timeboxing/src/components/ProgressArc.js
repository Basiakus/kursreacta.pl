import React, { Component } from 'react';
import '../styles/components/ProgressArc.scss';
class ProgressArc extends Component {
	constructor(props) {
		super(props);
		this.canvas = React.createRef();
		this.colorValue = 200;
		this.isOver = false;
	}
	componentDidMount() {
		this.drawCircleCanvas();
		this.animationRequest = window.requestAnimationFrame(this.updateColor);
	}
	componentDidUpdate() {
		this.drawCircleCanvas();
	}
	componentWillUnmount() {
		window.cancelAnimationFrame(this.animationRequest);
	}
	drawCircleCanvas = () => {
		const ctx = this.canvas.current.getContext("2d");
		const { canvasSize, percent } = this.props;
		ctx.clearRect(0, 0, canvasSize, canvasSize); //czyszczenie obszaru
		ctx.fillStyle = 'rgb(299, 100, 0, 0)'; //color zawartości 
		ctx.fillRect(0, 0, canvasSize, canvasSize); //obszar zawartości

		const gradient = ctx.createLinearGradient(100, 150, 200, 0);
		gradient.addColorStop("0", `rgb(255, ${this.colorValue}, 0)`);//red
		gradient.addColorStop(".5", `rgb(0, 255, ${this.colorValue})`);//green
		gradient.addColorStop("1", `rgb(${this.colorValue}, 0, 255)`);//blue
		ctx.strokeStyle = gradient;
		ctx.stroke();
		//console.log(ringPercent);

		ctx.beginPath();
		ctx.lineWidth = canvasSize / 5 ;
		//ctx.lineCap = "round";
		let ringPercent = percent < 0 ? 0 : (2 / 100) * percent;
		const x = canvasSize / 2;
		const y = x;
		const radius = canvasSize / 2.5;
		ctx.arc(x, y, radius, 0, ringPercent * Math.PI);
	}
	updateColor = () => {
		if (this.colorValue > 254 || this.colorValue === 0) {
			this.isOver = !this.isOver
		}
		this.colorValue = !this.isOver ? this.colorValue += 2 : this.colorValue -= 2;
		this.animationRequest = window.requestAnimationFrame(this.updateColor);
		this.drawCircleCanvas();
		//console.log(this.colorValue, this.isOver);
	}
	render() {
		const { canvasSize } = this.props;
		return (
			<div className='ProgressArc'><canvas ref={this.canvas} width={canvasSize} height={canvasSize} /></div>
		)
	}
}
export default ProgressArc;