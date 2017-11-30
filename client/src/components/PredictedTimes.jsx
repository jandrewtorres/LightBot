import React, { Component } from 'react';

class PredictedTimes extends Component {
  constructor() {
    super();
    this.state = {
      userSchedule: ''
    };

    this.getUserSchedule();
  }

  getUserSchedule = () => {
    console.log('getting user schedule');
  }

  render() {
    return (
      <div className='schedule-wrapper'>
        <p className='schedule-day-title'>Thursday: 9:32 pm</p>
        <p className='schedule-day-title'>Friday: 11:57 pm</p>
          <p className='schedule-day-title'>Saturday: 11:02 pm</p>
            <p className='schedule-day-title'>Sunday: 9:17 pm</p>
              <p className='schedule-day-title'>Monday: 9:12 pm</p>
                <p className='schedule-day-title'>Tuesday: 9:30 pm</p>
                  <p className='schedule-day-title'>Wednesday: 9:32 pm</p>
      </div>
    );
  }
}

export default PredictedTimes;
