import React from 'react';
import './App.css';

import jon from './out.json';


function App() {
  return (
    <div className="App">
      <div className="header"><img src="glass.png" alt="LU Roundel" /><div>Station Search</div></div>
      <ItemList />
    </div>
  );
}

class ItemList extends React.Component {
  constructor() {
    super();
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
      init: Object.values(jon),
      items: [],
      form: { }
    }
    this.state.items = this.state.init;
    this.filterList = this.filterList.bind(this);
    this.toggleAdv = this.toggleAdv.bind(this);
    this.clear = this.clear.bind(this);
    this.setLines = this.setLines.bind(this);
//    this.zoneShow = this.zoneShow.bind(this);
//    this.toggleZone = this.toggleZone.bind(this);
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

  
  filterList(e) {
    if (e === -1) {
      this.setState({items: this.state.init});
    }
    else {
//    this.setState({form[e.target.name]: e.target)};
//    let updatedList = this.state.init;
//        updatedList = updatedList.filter(item => {
//          return (
//            item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
//          )
//        })
    this.setState({ crit: {
      q: e.target.value
      }
    });
    }
  }
  
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
  
  toggleAdv() {
    this.setState({adv: !this.state.adv});
    if (this.state.adv) {
      this.setLines('all');
      this.setZones('all');
    }
  }
  
  lbView(input, cn) {
    if (this.state.lines.includes(input)) {
        return "linebullet " + cn;
    }
    else {
      return "linebullet inactive";
    }
  }
  
  clear() {
//      this.state.form["field"].value = "";
//      this.filterList(-1);
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

//    const rendered = this.state.items.map(i => i.obj.render());
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
    console.log(this.props.lines);
    let show = 
      this.props.init
      .filter(i => i.name.toLowerCase().search(("" + this.props.crit.q.replace("\\","")).toLowerCase()) !== -1)
      .filter(i => i.lines.filter(val => this.props.lines.includes(val)).length > 0)
      .filter(i => i.zones.filter(val => this.props.zones.map(r => "" + r).includes(val)).length > 0)
      .map(i => i.name);
    
    const shouldShow = (e) => {
      return show.includes(e.name);
    }
    
      let ret = this.props.init.sort(alph_asc).sort(filt).map(i => (<div key={i.name} style={{display: shouldShow(i) ? 'block' : 'none'}}><Entry item={i} /></div>));
      
       return (<React.Fragment><div className="count">{show.length} result{(show.length === 1) ? "" : "s"}</div>
      <div className="stations">{ret}</div></React.Fragment>);
  }
}

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

class Entry extends React.Component {

  render() {
//    const iu = "http://" + this.props.item.img;
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
    );
  }
}

export default App;
