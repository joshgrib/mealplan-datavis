import React from 'react';
import TodoApp from './TodoApp.jsx';

const meals = {
  'Breakfast - Pierce Dining Hall': 7.1690000000000005,
  'Lunch - Pierce Dining Hall': 9.951,
  'Dinner - Pierce Dining Hall': 13.268,
  'Late Night - Pierce Dining Hall': 9.3625,
  'Any meal - America\'s Cup': 10.432500000000001,
  'Any meal - Chop\'d & Wrap\'d': 12.1873,
  'Any meal - Red & Gray Cafe': 10.432500000000001,
  'Breakfast - Colonel John\'s - Grill Nation': 7.5435,
  'Lunch/Dinner - Colonel John\'s - Grill Nation': 11.737900000000002,
  'Any meal - Colonel John\'s - Asian Express': 11.545300000000001,
  'Any meal - Colonel John\'s - Personal Pizza': 7.7575
}
const plans = {
  'Platinum': 9.38082191780822,
  'Gold': 9.876923076923077,
  'Silver': 12.988439306358382,
  '80 meals': 13.04878048780488,
  '60 meals': 13.155737704918034,
  '25 meals': 14.98
}

export default class App extends React.Component {
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Hello World</h1>
        <TodoApp/>
      </div>);
  }
}
