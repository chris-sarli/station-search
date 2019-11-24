import React from 'react';

class ServiceLine extends React.Component {
	render() {
		
		let color;
		switch (this.props.line) {
			case "Bakerloo":
				color = "rgb(178, 99, 0)";
				break;
			case "Central":
				color = "rgb(220, 36, 31)";
				break;
			case "Circle":
				color = "rgb(255, 211, 41)";
				break;
			case "District":
				color = "rgb(0, 125, 50)";
				break;
			case "Hammersmith & City":
				color = "rgb(244, 169, 190)";
				break;
			case "Jubilee":
				color = "rgb(161, 165, 167)";
				break;
			case "Metropolitan":
				color = "rgb(155, 0, 88)";
				break;
			case "Northern":
				color = "rgb(0, 0, 0)";
				break;
			case "Piccadilly":
				color = "rgb(0, 25, 168)";
				break;
			case "Victoria":
				color = "rgb(0, 152, 216)";
				break;
			case "Waterloo & City":
				color = "rgb(147, 206, 186)";
				break;
			default:
				color = "rgb(255, 255, 255)";
				break;
		}
		
		let styles = {
			"width": "100%",
			"borderLeft": "6px solid " + color,
			"marginTop": "10px",
			"marginBottom": "10px",
			"paddingLeft": "5px",
			"paddingTop": "3px"
		}
		
		return <div style={styles}>{this.props.line} line</div>
	}
}

export default ServiceLine;