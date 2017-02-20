import React from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import PlanList from './PlanList.jsx';
import MealList from './MealList.jsx';
import TableExampleComplex from './DataTable.jsx';

const muiTheme = getMuiTheme({
    palette:{

    }
})

export default class App extends React.Component {
    constructor(){
        super();
        this._handleClick = this._hanndleClick.bind(this);
    }
    getChildContext(){
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }
    _handleClick(e){
        e.preventDefault();
        //show/hide LeftMenu
        this.refs.leftNav.toggle();
    }
    render() {
        let menuItems = [
            {route:'mealplans', text:'Meal Plans'},
            {route:'locations', text:'Locations & Meals'},
            {}
        ]
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title="Stevens Meal Plans Breakdown"
                        iconElementRight={
                            <IconButton
                                iconClassName="fa fa-github"
                                onClick={console.log("gh click")}
                                />
                        }
                        onLeftIconButtonTouchTap={console.log("Left button")}
                        onRightIconButtonTouchTap={console.log("Right button")}
                    />
                    <PlanList/>
                    <MealList/>
                    <TableExampleComplex/>
                </div>
            </MuiThemeProvider>
        );
    }
}

var meals = {
    'Breakfast @ Pierce Dining Hall': 7.1690000000000005,
    'Lunch @ Pierce Dining Hall': 9.951,
    'Dinner @ Pierce Dining Hall': 13.268,
    'Late Night @ Pierce Dining Hall': 9.3625,
    'Any meal @ America\'s Cup': 10.432500000000001,
    'Any meal @ Chop\'d & Wrap\'d': 12.1873,
    'Any meal @ Red & Gray Cafe': 10.432500000000001,
    'Breakfast @ Colonel John\'s - Grill Nation': 7.5435,
    'Lunch/Dinner @ Colonel John\'s - Grill Nation': 11.737900000000002,
    'Any meal @ Colonel John\'s - Asian Express': 11.545300000000001,
    'Any meal @ Colonel John\'s - Personal Pizza': 7.7575
}
var plans = {
    'Platinum': 9.38082191780822,
    'Gold': 9.876923076923077,
    'Silver': 12.988439306358382,
    '80 meals': 13.04878048780488,
    '60 meals': 13.155737704918034,
    '25 meals': 14.98
}
