import React from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

import MealCard from './MealCard.jsx';

export default class MealList extends React.Component {
    constructor(props){
      // Pass props to parent class
      super(props);
      // Set initial state
      this.state = {
        data: {}
      }
    }
    componentDidMount(){
        let mealData = require('../data/meals/meals.js')
        this.setState({data:mealData})
    }
    render() {
        let mealData = this.state.data;

        let mealList = [];
        for(let p in mealData){
            //console.log(mealData[p]);
            mealList.push(mealData[p]);
        }

        return (
            <div>
                {mealList.map( (meal, index) => (
                    <MealCard mealObj={meal} ind={index} key={index}/>
                ))}
                <hr/>
            </div>
        )
    }
}
