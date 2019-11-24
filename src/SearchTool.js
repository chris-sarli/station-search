import React from 'react';

import ResList from './ResList.js';

class SearchTool extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			adv: false,
			zones: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			lines: [
				'Bakerloo',
				'Central',
				'Circle',
				'District',
				'Hammersmith & City',
				'Jubilee',
				'Metropolitan',
				'Northern',
				'Piccadilly',
				'Victoria',
				'Waterloo & City'
			],
			sortby: 'alph',
			crit: {
				q: "",
				zones: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			},
			init: Object.values(this.props.data),
			items: [],
			form: { }
		}
		this.state.items = this.state.init;
		this.filterList = this.filterList.bind(this);
		this.toggleAdv = this.toggleAdv.bind(this);
		this.clear = this.clear.bind(this);
		this.setLines = this.setLines.bind(this);
	}
	
	setLines(f) {
		if (f === "none") {
			this.setState({lines: []})
		} else if (f === "all") {
			this.setState({lines: [
				'Bakerloo',
				'Central',
				'Circle',
				'District',
				'Hammersmith & City',
				'Jubilee',
				'Metropolitan',
				'Northern',
				'Piccadilly',
				'Victoria',
				'Waterloo & City'
			]});
		}
	}

	setZones(f) {
		if (f === "none") {
			this.setState({zones: []})
		} else if (f === "all") {
			this.setState({zones: [1, 2, 3, 4, 5, 6, 7, 8, 9]});
		}
	}
	
	// Change the filter by updated the query to match the inputted text
	filterList(e) {
		if (e === -1) {
			this.setState({items: this.state.init});
		}
		else {
			this.setState({ crit: {q: e.target.value}});
		}
	}
	
	// Change the filter by turning a zone on or off
	toggleZone(e) {
		let ne;
		if (this.state.zones.includes(e)) {
			ne = this.state.zones.filter(i => i !== e);
		} else {
			ne = this.state.zones;
			ne.push(e);
			this.setState({'zones': ne});
		}
		this.setState({'zones': ne});
	}
	
	// Change the filter by turning a line on or off
	toggleLine(e) {
		let ne;
		if (this.state.lines.includes(e)) {
			ne = this.state.lines.filter(i => i !== e);
			
		} else {
			ne = this.state.lines;
			ne.push(e);
			this.setState({'lines': ne});
		}
		this.setState({'lines': ne});
	}
	
	// Toggle the advanced search panel
	toggleAdv() {
		this.setState({adv: !this.state.adv});
		if (this.state.adv) {
			this.setLines('all');
			this.setZones('all');
		}
	}
	
	/* Determine classes for given lineselector
	 * input - key
	 * cn - className corresponding to line
	 */
	lbView(input, cn) {
		if (this.state.lines.includes(input)) {
				return "linebullet " + cn;
		}
		else {
			return "linebullet inactive";
		}
	}
	
	// Clear the filter/sort
	clear() {
			this.setZones('all');
			this.setLines('all');
			this.setState({crit: {
				q: ""
			}});
			this.setState({sortby: 'alph'});
	}
	
	render() {
		
		const zoneShow = (e) => {
			return !this.state.zones.includes(e) ? "nozonesel zonesel" : "zonesel";
		}

		return (
		<div className="ilcont">
			<div className="scont">
				<div className={this.state.adv ? 'searcher adv' : 'searcher'}>
					<input type="text" name="field" placeholder="Station name..." value={this.state.crit.q} onChange={this.filterList}></input>
					<div className="split">
						<div className="subsplit linefilter">
							<div className="title"><span>Filter by line</span>
								<div className="filterControls">
									<div onClick={() => this.setLines('none')}>Select None</div>
									<div onClick={() => this.setLines('all')}>Select All</div>
								</div>
							</div>
							<div className="linechecks">
								<div className={this.lbView("Bakerloo", "bakerloo")} onClick={() => this.toggleLine("Bakerloo")}>Bakerloo</div>
								<div className={this.lbView("Central", "central")} onClick={() => this.toggleLine("Central")}>Central</div>
								<div className={this.lbView("Circle", "circle")} onClick={() => this.toggleLine("Circle")}>Circle</div>
								<div className={this.lbView("District", "district")} onClick={() => this.toggleLine("District")}>District</div>
								<div className={this.lbView("Hammersmith & City", "hc")} onClick={() => this.toggleLine("Hammersmith & City")}>Hammersmith & City</div>
								<div className={this.lbView("Jubilee", "jubilee")} onClick={() => this.toggleLine("Jubilee")}>Jubilee</div>
								<div className={this.lbView("Metropolitan", "metropolitan")} onClick={() => this.toggleLine("Metropolitan")}>Metropolitan</div>
								<div className={this.lbView("Northern", "northern")} onClick={() => this.toggleLine("Northern")}>Northern</div>
								<div className={this.lbView("Piccadilly", "piccadilly")} onClick={() => this.toggleLine("Piccadilly")}>Piccadilly</div>
								<div className={this.lbView("Victoria", "victoria")} onClick={() => this.toggleLine("Victoria")}>Victoria</div>
								<div className={this.lbView("Waterloo & City", "wc")} onClick={() => this.toggleLine("Waterloo & City")}>Waterloo & City</div>
							</div>
						</div>
						<div className="subsplit linefilter zf">
							<div className="title"><span>Filter by zone</span>
							<div className="filterControls">
								<div onClick={() => this.setZones('none')}>Select None</div>
								<div onClick={() => this.setZones('all')}>Select All</div>
							</div>
							</div>
							<div className="zonessel">
								<div className={zoneShow(1)} onClick={() => this.toggleZone(1)}><span>1</span></div>
								<div className={zoneShow(2)} onClick={() => this.toggleZone(2)}><span>2</span></div>
								<div className={zoneShow(3)} onClick={() => this.toggleZone(3)}><span>3</span></div>
								<div className={zoneShow(4)} onClick={() => this.toggleZone(4)}><span>4</span></div>
								<div className={zoneShow(5)} onClick={() => this.toggleZone(5)}><span>5</span></div>
								<div className={zoneShow(6)} onClick={() => this.toggleZone(6)}><span>6</span></div>
								<div className={zoneShow(7)} onClick={() => this.toggleZone(7)}><span>7</span></div>
								<div className={zoneShow(8)} onClick={() => this.toggleZone(8)}><span>8</span></div>
								<div className={zoneShow(9)} onClick={() => this.toggleZone(9)}><span>9</span></div>
							</div>
						</div>
						<div className="subsplit sortby">
							<div className="sel">Sort by: 
								<div className="select">
									<select value={this.state.sortby} onChange={(e) => this.setState({sortby: e.target.value})}>
										<option value="alph">Alphabetical</option>
										<option value="alph_r">Reverse Alphabetical</option>
										<option value="ridership_lo">Ridership (Lowest first)</option>
										<option value="ridership_hi">Ridership (Highest first)</option>
										<option value="age_lo">Station Age (Oldest first)</option>
										<option value="age_hi">Station Age (Highest first)</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="belowopts">
					<div className="clear" onClick={this.clear}>Clear Search</div>
					<div className="advanced" onClick={this.toggleAdv}>{this.state.adv ? "Simple" : "Advanced"} Search...</div>
				</div>
			</div>
				<ResList init={this.state.init} crit={this.state.crit} zones={this.state.zones} lines={this.state.lines} sortby={this.state.sortby}/>
		</div>);
	}
}

export default SearchTool;