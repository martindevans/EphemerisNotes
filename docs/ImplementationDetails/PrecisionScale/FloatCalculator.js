import React from 'react';

export default class FloatCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.calcState(42, 1000000);
    this.handleChange = this.handleChange.bind(this);
  }

  calcState(distance, scale) {
    let n = distance / scale;
    return {
      value: n,
      distance: distance,
      distanceStr: this.calcDistance(distance),
      scale: scale,
      precision16: this.calcDistance(this.calcPrecision(n, 10) * scale),
      precision32: this.calcDistance(this.calcPrecision(n, 23) * scale),
      precision64: this.calcDistance(this.calcPrecision(n, 52) * scale),
    }
  }

  calcDistance(n)
  {
    n = Number(n);
    const unitList = ['y', 'z', 'a', 'f', 'p', 'n', 'u', 'm', '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    const zeroIndex = 8;
    const nn = n.toExponential(2).split(/e/);
    let u = Math.floor(+nn[1] / 3) + zeroIndex;
    if (u > unitList.length - 1) {
      u = unitList.length - 1;
    } else
    if (u < 0) {
      u = 0;
    }
    return nn[0] * Math.pow(10, +nn[1] - (u - zeroIndex) * 3) + unitList[u] + "m";
  }

  calcPrecision(number, mantissa) {
    let log2 = Math.log2(number);
    let range = Math.pow(2, Math.floor(log2));
    return range / Math.pow(2, mantissa).toLocaleString('fullwide', {useGrouping:false});
  }

  handleChange(event) {
    let dist = this.state.distance;
    let scale = this.state.scale;

    if (event.target.name == "distance") {
      dist = event.target.value;
    }
    if (event.target.name == "scale") {
      scale = event.target.value;
    }
    
    this.setState(
      this.calcState(
        dist,
        scale
      )
    );
  }
  
  render() {
    return (
      <form>
        <p>Given a distance (the actual <bold>distance</bold> you want to store) and a scale (sets what the number '1.0' actually represents) calculate the minimum distance that can be represented at that distance.</p>
        <p>
          <label for="distance">Distance: </label>
          <input type="number" name="distance" id="distance" step="any" value={this.state.distance} onChange={this.handleChange} />
        </p>
        <p>
          <label for="scale">Scale: </label>
          <input type="scale" name="scale" id="scale" step="any" value={this.state.scale} onChange={this.handleChange} />
        </p>
        <ul>
          <li>Distance: {this.state.distanceStr}</li>
          <li>Stored Value: {this.state.value}</li>
          <li>Half Precision: {this.state.precision16}</li>
          <li>Single Precision: {this.state.precision32}</li>
          <li>Double Precision: {this.state.precision64}</li>
        </ul>
      </form>
    );
  }
}