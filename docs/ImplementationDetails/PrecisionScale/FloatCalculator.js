import React from 'react';

export default class FloatCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.calcState(816356000000, 1);
    this.handleChange = this.handleChange.bind(this);
  }

  calcState(distance, scale) {
    let n = BigInt(distance) / BigInt(scale);
    return {
      value: Number(n),
      distance: distance,
      distanceStr: this.calcDistance(distance),
      scale: scale,
      precision32: this.calcDistance(this.calcPrecision32(n) * scale),
      precision64: this.calcDistance(this.calcPrecision64(n) * scale),
    }
  }

  calcDistance(n)
  {
    n = Number(n);
    if (isNaN(n)) {
      return "Out Of Range";
    }

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

    let result = nn[0] * Math.pow(10, +nn[1] - (u - zeroIndex) * 3);
    return result.toFixed(6) + unitList[u] + "m";
  }

  calcPrecision32(number)
  {
    var value = Number(number);

    var floatArray = new Float32Array(1);
    floatArray[0] = value;

    var intArray = new Int32Array(floatArray.buffer);
    intArray[0]++;

    return (floatArray[0] - value);
  }

  calcPrecision64(number)
  {
    var value = Number(number);

    var floatArray = new Float64Array(1);
    floatArray[0] = value;

    var intArray = new BigInt64Array(floatArray.buffer);
    intArray[0]++;

    return (floatArray[0] - value);
  }

  handleChange(event) {
    let dist = this.state.distance;
    let scale = this.state.scale;

    switch (event.target.name) {
      case "distance":
        dist = event.target.value;
        break;
      case "scale":
        scale = event.target.value;
        break;
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
        <p>Given a distance (the actual <bold>distance</bold> you want to store) and a scale (sets what the number '1.0' actually represents) calculate the smallest possible distance that can be represented at that distance.</p>
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
          <li>Single Precision: {this.state.precision32}</li>
          <li>Double Precision: {this.state.precision64}</li>
        </ul>
      </form>
    );
  }
}