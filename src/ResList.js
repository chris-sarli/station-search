import React from 'react';

import Entry from './Entry.js';

class ResList extends React.Component {
	
	render() {
		
		let alph_asc = (a, b) => {
			return b.name < a.name;
		}
		
		let alph_desc = (a, b) => {
			return b.name > a.name;
		}
		
		let usage_asc = (a, b) => {
			return parseFloat(b.usages) < parseFloat(a.usages);
		}
		
		let usage_desc = (a, b) => {
			return parseFloat(b.usages) > parseFloat(a.usages);
		}
		
		let age_asc = (a, b) => {
			return Date.parse(b.date) < Date.parse(a.date);
		}
		
		let age_desc = (a, b) => {
			return Date.parse(b.date) > Date.parse(a.date);
		}
	
		let filt = alph_asc;
		
		// Set sorting function
		switch (this.props.sortby) {
			case "alph":
				filt = alph_asc;
				break;
			case "alph_r":
				filt = alph_desc;
				break;
			case "ridership_lo":
				filt = usage_asc;
				break;
			case "ridership_hi":
				filt = usage_desc;
				break;
			case "age_lo":
				filt = age_asc;
				break;
			case "age_hi":
				filt = age_desc;
				break;
			default:
				filt = alph_asc;
				break;
		}
		
		// Create teh filtered list
		let show = 
			this.props.init
			.filter(i => 
				i.name.toLowerCase()
				.search(("" + this.props.crit.q
					.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'))
					.toLowerCase()) !== -1)
			.filter(i => i.lines.filter(val => this.props.lines
				.includes(val)).length > 0)
			.filter(i => 
				i.zones.filter(val => this.props.zones.map(r => "" + r)
					.includes(val)).length > 0)
			.map(i => i.name);
		
		// Determine wether a given station item should be shown
		const shouldShow = (e) => {
			return show.includes(e.name);
		}
		
		// Create the entries
		let ret = this.props.init.sort(alph_asc).sort(filt)
			.map(i => 
				(<div
					key={i.name}
					style={{display: shouldShow(i) ? 'block' : 'none'}}>
				<Entry item={i} /></div>));
			
		return (<React.Fragment>
			<div className="count">
				{show.length} result{(show.length === 1) ? "" : "s"}
			</div>
			<div className="stations">{ret}</div></React.Fragment>);
	}
}

export default ResList;