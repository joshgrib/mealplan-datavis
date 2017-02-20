import React from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

export default class MealCard extends React.Component {
    constructor(props){
      // Pass props to parent class
      super(props);
      // Set initial state
      this.state = {
        data: {}
      }
    }
    getName(){
        return this.props.mealObj.name;
    }
    getLocation(){
        return this.props.mealObj.location;
    }
    render() {
        return (
            <Card key={this.props.ind}>
                <CardHeader
                    title={this.getName()}
                    subtitle={this.getLocation()}
                    actAsExpander={false}
                    showExpandableButton={false}
                />
            //the body here could have columns for categories
            //and lists in each for the prices and items
            </Card>
        )
    }
}
