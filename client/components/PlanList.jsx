import React from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

import PlanCard from './PlanCard.jsx';

export default class PlanList extends React.Component {
    constructor(props){
      // Pass props to parent class
      super(props);
      // Set initial state
      this.state = {
        data: {}
      }
    }
    componentDidMount(){
        let planData = require('../data/plans/plans.js')
        this.setState({data:planData})
    }
    render() {
        let planData = this.state.data;

        let planList = [];
        for(let p in planData){
            //console.log(planData[p]);
            planList.push(planData[p]);
        }

        return (
            <div>
                {planList.map( (plan, index) => (
                    <PlanCard planObj={plan} ind={index} key={index}/>
                ))}
                <hr/>
            </div>
        )
    }
}
