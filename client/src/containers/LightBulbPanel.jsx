import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select-plus';
const defaultLightbulb = require('../../../images/lightbulb.png');

const options = [
  {
    label: 'Basic Functionality',
    options: [
      { label: "On", value: "light" },
      { label: "Off", value: "dark" },
      { label: "Dim", value: "dim" },
      { label: "Brighten", value: "brighten" }
    ]
  },
  {
    label: 'Colors',
    options: [
      { label: "Green", value: 'green'},
      { label: "Red", value: 'red'},
      { label: 'Blue', value: 'blue'},
      { label: 'Purple', value: 'purple'},
      { label: 'Pink', value: 'pink'},
      { label: 'Orange', value: 'orange'}
    ]
  },
  {
    label: 'Moods',
    options: [
      { label: 'Love', value: 'love'},
      { label: 'Happy', value: 'happy'},
      { label: 'Mad', value: 'mad'},
      { label: 'Sad', value: 'sad'}
    ]
  }
];
/**
  *
  */
class LightBulbPanel extends React.Component {
  /**
    * Class constructor
    */
  constructor(props) {
    super(props);
    this.logChange = this.logChange.bind(this);
  };



  logChange(val) {
    console.log(val.value);
    this.props.setLightStatus(val.value);
    var intent;
    var color = 'none';
    if (val.value == 'light') {
        intent = 'light_on';
    }
    else if (val.value == "dark") {
        intent = 'light_off';
    }
    else if (val.value == "dim") {
        intent = 'light_dim';
    }
    else if (val.value == "brighten") {
        intent = 'light_brighten';
    }
    else if (val.value == 'green' || val.value == 'red' || val.value == 'blue' ||
      val.value == 'purple' || val.value == 'pink' || val.value == 'orange') {
        color = val.value;
        intent = 'light_color';
    }
    else if (val.value == 'love' || val.value == 'happy' || val.value == 'happy' ||
      val.value == 'mad' || val.value == 'sad') {
        intent = 'light_mood';
    }
    console.log(color);
    console.log(intent);
    this.props.saveUserAction(color, intent);
  }

  render() {
    return(
      <div id="lightbulb-panel" className={"panel " + this.props.lightStatus}>
        <Select
          name="form-field-name"
          value="one"
          options={options}
          onChange={this.logChange}
          placeholder='Choose an action...'
        />
        <div id="bulb-wrapper">
          <img src={ defaultLightbulb }  />
        </div>
        <div id="submit-msg-wrapper">
          <button
            id='submit-msg-feedback'
            onClick={this.props.toggleModal}>
            Submit Feedback
          </button>
        </div>
      </div>
    );
  }
};

export default LightBulbPanel;
