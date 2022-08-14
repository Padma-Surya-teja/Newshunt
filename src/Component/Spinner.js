import React, { Component } from 'react'
import spinnergif from '../spinnergif.gif'
export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={spinnergif} alt="loading" />
      </div>
    )
  }
}

export default Spinner
