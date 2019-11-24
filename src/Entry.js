import React from 'react';

import ServiceLine from './ServiceLine.js';

class Entry extends React.Component {

	render() {
		const iu = this.props.item.img;
		let styles = {
			"backgroundImage": 'url(' + iu + ')',
			"backgroundSize": "cover"
		}
		
		let lines = this.props.item.lines.map(l => <ServiceLine line={l} key={l} />);
		let zone;
		if (this.props.item.zones.length === 1) {
			zone = "Zone " + this.props.item.zones[0]
		} else {
			zone = "Zones " + this.props.item.zones[0] + " & " + this.props.item.zones[1]
		}
		
		const a_url = "https://en.wikipedia.org/" + this.props.item.url;
		
		const anyConns = () => {
			if (this.props.item.connections.length > 0) {
				return "divider dividerConn";
			}
			return "notconn";
		}
		
		const connshow = (c) => {
			if (this.props.item.connections.includes(c)) {
				return "connections"
			}
			return "connections notconn"
		}
		
		return (
		<a href={a_url} target="_blank" rel="noopener noreferrer">
			<div className="item">
				<div className="img_sect" style={styles}></div>
				<div className="station_content">
					<div className="station_name">{this.props.item.name}</div>
					<div className="stat"><strong>Opened:</strong> {this.props.item.date}</div>
					<div className="stat"><strong>Ridership:</strong> {this.props.item.usages} million</div>
					<div className="divider"><strong>Tube</strong> {zone}</div>
					<div>{lines}</div>
					<div className={anyConns()}><strong>Connections</strong></div>
						<div className={connshow('eliz')}>
							<img src="icons/eliz.png" alt="Elizabeth Line Roundel" />
							Elizabeth Line
						</div>
						<div className={connshow('overground')}>
							<img src="icons/overground.png" alt="Overground Roundel" />
							Overground
						</div>
						<div className={connshow('tram')}>
							<img src="icons/trams.png" alt="Tram Roundel" />
							Tramlink
						</div>
						<div className={connshow('dlr')}>
							<img src="icons/dlr.png" alt="DLR Roundel" />
							DLR
						</div>
						<div className={connshow("nr")}>
							<img src="icons/nr.png" alt="National Rail Logo" />
							National Rail
						</div>
				</div>
			</div>
			</a>
		);
	}
}

export default Entry;