import React from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

export default class PlanCard extends React.Component {
    constructor(props){
      // Pass props to parent class
      super(props);
      // Set initial state
      this.state = {
        data: {}
      }
    }
    getName(){
        return this.props.planObj.name;
    }
    getCost(){
        return this.props.planObj.cost;
    }
    getPierceSwipes(){
        const pierceSwipes = this.props.planObj.swipes.buffet;
        return pierceSwipes.unlimited?
        "Unlimited":
        `${pierceSwipes.quantity} per ${pierceSwipes.period}`
    }
    getMealExchanges(){
        const exchanges = this.props.planObj.swipes.exchange;
        return `Up to ${exchanges.quantity} per ${exchanges.period}`
    }
    getGuestSwipes(){
        const guestSwipes = this.props.planObj.swipes.guest;
        return guestSwipes>0?guestSwipes:"None";
    }
    render() {
        return (
            <Card key={this.props.ind}>
                <CardHeader
                    title={this.getName()}
                    subtitle={`$${this.getCost().toFixed(2)}`}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <List expandable={true}>
                    <ListItem
                        primaryText='Pierce swipes'
                        secondaryText={this.getPierceSwipes()}
                    />
                    <ListItem
                        primaryText='Meal exchanges'
                        secondaryText={this.getMealExchanges()}
                    />
                    <ListItem
                        primaryText='Guest swipes'
                        secondaryText={`${this.getGuestSwipes()} per semester`}
                    />
                    <ListItem
                        primaryText="Washington Street Wednesday"
                        secondaryText="Included, for 1 meal period Wednesday"
                    />
                    <ListItem
                        primaryText="Duckbill options"
                        secondaryText="$0, $100, or $300"
                    />
                </List>
            </Card>
        )
    }
}

/*
{planList.map( (plan, index) => (
    <Card key={index}>
        <CardHeader
            title={plan.name}
            subtitle={`Cost: ${plan.cost.toFixed(2)}`}
            actAsExpander={true}
            showExpandableButton={true}
        />
        <List expandable={true}>
            {let pierceRate = plan.swipes.buffet.unlimited?"Unlinimited":`${plan.swipes.buffet.quantity}/${plan.swipes.buffet.period}`}
            <ListItem primaryText="Pierce entry: "/>
            <ListItem primaryText="Swipes"/>
            <ListItem primaryText="Swipes"/>
        </List>
    </Card>
))}
*/
