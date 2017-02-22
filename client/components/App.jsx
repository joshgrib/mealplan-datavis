import React from 'react';
import ReactDOM from 'react-dom';

import { Container, Row, Col } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Table } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';


//import { TodoApp } from './TodoApp.jsx';

const AppHeader = ({main, sub, clickFn}) => {
    return (
        <header
            onClick={(e) => {
                //e.preventDefault();
                clickFn("Header click");
            }}>
            <h1>{main}</h1>
            <h2>{sub}</h2>
        </header>
    );
}

const MealPlanList = ({planList}) => {
    return (
        <ListGroup>
            {planList.map((planObj) => {
                return (
                    <ListGroupItem key={planObj.name}>
                        <b>{planObj.name}</b><br/>
                        ${planObj.price.toFixed(2)}
                    </ListGroupItem>
                )
            })}
        </ListGroup>
    );
}

const MealCostList = ({mealList}) => {
    return (
        <ListGroup>
            {mealList.map((mealObj) => {
                return (
                    <ListGroupItem key={mealObj.name}>
                        <b>{mealObj.name}</b><br/>
                        ${mealObj.price.toFixed(2)}
                    </ListGroupItem>
                )
            })}
        </ListGroup>
    )
}

const DisplayJSON = ({title, jsonData}) => {
    return (
        <div>
            <header>{title}</header>
            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
    )
}

const PlanTable = ({planData}) => {
    let planList = [];
    for(let p in planData){
        let planObj = planData[p];
        let exchanges = `${planObj.swipes.exchange.quantity} per ${planObj.swipes.exchange.period}`;
        let pierceCount = planObj.swipes.buffet.unlimited?
            'Unlimited' :
            `${planObj.swipes.buffet.quantity} per ${planObj.swipes.buffet.period}`;

        let plan = {
            'name':planObj.name,
            'pierce':pierceCount,
            'exchanges':exchanges,
            'guests':planObj.swipes.guest,
            'cost':planObj.cost
        }
        planList.push(plan);
    }

    return (
        <section id="mealPlanTable">
            <p>*All meal plans have Washington Street Wednesday and can include 0, 100, or 300 Duckbills.</p>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Pierce Swipes</th>
                        <th>Meal Exchanges</th>
                        <th>Guest Swipes</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {planList.map((plan) => {
                        return (
                            <tr key={plan.name}>
                                <th>{plan.name}</th>
                                <td>{plan.pierce}</td>
                                <td>{plan.exchanges}</td>
                                <td>{plan.guests}</td>
                                <td>{plan.cost}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </section>
    );
}

const MealTable = ({mealData}) => {
    let mealList = [];
    for(let m in mealData){
        let mealObj = mealData[m];

        let maxMeal = [];
        let maxMealPrice = 0;
        let minMeal = [];
        let minMealPrice = 0;

        for(let c in mealObj.categories){
            let items = mealObj.categories[c].items;

            let maxItem = items[0].name;
            let maxPrice = parseFloat(items[0].price);
            let minItem = items[0].name;
            let minPrice = parseFloat(items[0].price);

            for(let i in items){
                let item = items[i];
                let p = parseFloat(item.price);
                if(p < minPrice){
                    minPrice = p;
                    minItem = item.name;
                }
                if(p > maxPrice){
                    maxPrice = p;
                    maxItem = item.name;
                }
            }

            maxMeal.push(maxItem);
            maxMealPrice += maxPrice;
            minMeal.push(minItem);
            minMealPrice += minPrice;
        }

        let meal = {
            'name':mealObj.name,
            'location':mealObj.location,
            'minprice':minMealPrice,
            'mincombo':minMeal,
            'maxprice':maxMealPrice,
            'maxcombo':maxMeal
        }
        mealList.push(meal);
    }
    return (
        <section id="mealTable">
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Meal</th>
                        <th>Max Value</th>
                        <th>Min Value</th>
                    </tr>
                </thead>
                <tbody>
                    {mealList.map((meal) => {
                        let name = meal.name;
                        let loc = meal.location;
                        let maxPrice = meal.maxprice.toFixed(2);
                        let maxItems = meal.maxcombo;
                        let minPrice = meal.minprice.toFixed(2);
                        let minItems = meal.mincombo;
                        return (
                            <tr key={`${meal.name} @ ${meal.location}`}>
                                <td>{name}</td>
                                <td>{loc}</td>
                                <td>
                                    {`${maxPrice} ($${(maxPrice*1.07).toFixed(2)} w/ tax)`}
                                    <br/>
                                    {maxItems.join(' + ')}
                                </td>
                                <td>
                                    {`${minPrice} ($${(minPrice*1.07).toFixed(2)} w/ tax)`}
                                    <br/>
                                    {minItems.join(' + ')}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </section>
    );
}

const CostValueSideBar = ({planData, mealData}) => {
    return (
        <section>
            <header>
                <h3>Meal plan costs and values</h3>
            </header>

            <h4>Meal Plans</h4>
            <PlanTable planData={planData}/>

            <h4>Maximum Values</h4>
            <MealTable mealData={mealData}/>
        </section>
    );
}

const ValueChart = ({ title, planData, mealData, updateUsage, updateGuests, updateUnlimited, updateTax, updateWeeks, stateStatus}) => {
    let planList = [];
    for(let p in planData){
        let planObj = planData[p];
        let cost = parseInt(planObj.cost);
        let swipes = planObj.swipes.buffet.quantity;
        //multiply for weekly plans
        if(planObj.swipes.buffet.period=='week'){
            swipes = swipes * stateStatus.semester_weeks;
        }
        //adjust usage
        swipes = swipes * stateStatus.swipe_usage;
        //add extra unlimited swipes if the plan is unlimited
        if(planObj.swipes.buffet.unlimited){
            swipes = swipes + stateStatus.unlimited;
        }
        //add guest swipes
        swipes = swipes + stateStatus.guest_usage;
        let swipeCost = (cost/swipes).toFixed(2);
        planList.push({'name':planObj.name, 'value':swipeCost})
    }
    let mealList = [];
    for(let m in mealData){
        let mealObj = mealData[m];
        console.log(mealObj);
    }
    return (
        <section id="valueChart">
            <header>{title}</header>
            <pre>{JSON.stringify(stateStatus, null, 2)}</pre>
            <Form>
                <FormGroup>
                    Usage:<br/>
                    <InputGroup>
                        <Input type="number" name="usage" id="usage"
                            defaultValue={stateStatus.swipe_usage * 100}
                            onChange={updateUsage}
                            min={0} max={100} step={1}/>
                        <InputGroupAddon>% general swipe usage</InputGroupAddon>
                    </InputGroup>
                    <InputGroup>
                        <Input type="number" name="guests" id="guests"
                            defaultValue={stateStatus.guest_usage * 100}
                            onChange={updateGuests}
                            min={0} max={100} step={1}/>
                        <InputGroupAddon>% guest swipe usage</InputGroupAddon>
                    </InputGroup>
                    <InputGroup>
                        <Input type="number" name="unlim" id="unlim"
                            defaultValue={stateStatus.unlimited}
                            onChange={updateUnlimited}
                            min={0} step={1}/>
                        <InputGroupAddon>swipes per week over 21</InputGroupAddon>
                    </InputGroup>
                    <InputGroup>
                        <Input type="number" name="tax" id="tax"
                            defaultValue={parseInt((stateStatus.tax-1)*100)}
                            onChange={updateTax}
                            min={0} step={1}/>
                        <InputGroupAddon>% tax</InputGroupAddon>
                    </InputGroup>
                    <InputGroup>
                        <Input type="number" name="weeks" id="weeks"
                            defaultValue={stateStatus.semester_weeks}
                            onChange={updateWeeks}
                            min={0} max={26} step={1}/>
                        <InputGroupAddon>weeks in the semester</InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </Form>
            <div></div>
        </section>
    );
}

let mData = require('../data/meals/meals.js');
let pData = require('../data/plans/plans.js');

export default class App extends React.Component {
    constructor(props){
        // Pass props to parent class
        super(props);
        // Set initial state
        this.state = {
            swipe_usage:1,
            guest_usage:1,
            unlimited:0,
            tax:1.07,
            semester_weeks:17
        }
    }
    // Lifecycle method
    componentDidMount(){
        console.log('App mounted');
    }
    changeStateVal(key, newVal){
        let s = this.state;
        s[key] = newVal;
        this.setState(s);
    }
    updateUsage(e) {
        let newVal = e.target.value;
        this.changeStateVal('swipe_usage', parseFloat(newVal/100));
    }
    updateGuests(e) {
        let newVal = e.target.value;
        this.changeStateVal('guest_usage', parseFloat(newVal/100));
    }
    updateUnlimited(e) {
        let newVal = e.target.value;
        this.changeStateVal('unlimited', parseFloat(newVal));
    }
    updateTax(e) {
        let newVal = e.target.value;
        this.changeStateVal('tax', parseFloat(1+(newVal/100)));
    }
    updateWeeks(e) {
        let newVal = e.target.value;
        this.changeStateVal('semester_weeks', parseFloat(newVal));
    }
    render() {
        return (
            <div>
                <Container id="joshApp">
                    <Row>
                        <AppHeader
                            main="Stevens Meal Plans"
                            sub="Which one is best for you?"/>
                    </Row>
                    <Row id="joshMain">
                        <Col>
                            <CostValueSideBar
                                planData={pData}
                                mealData={mData}/>
                        </Col>
                        <Col>
                            <ValueChart
                                title="Meal plan value chart"
                                planData={pData}
                                mealData={mData}
                                updateUsage={this.updateUsage.bind(this)}
                                updateGuests={this.updateGuests.bind(this)}
                                updateUnlimited={this.updateUnlimited.bind(this)}
                                updateTax={this.updateTax.bind(this)}
                                updateWeeks={this.updateWeeks.bind(this)}
                                stateStatus={this.state}
                                />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

var mealArr = [
    {'name':'Breakfast @ Pierce Dining Hall', 'price': 7.1690000000000005},
    {'name':'Lunch @ Pierce Dining Hall', 'price': 9.951},
    {'name':'Dinner @ Pierce Dining Hall', 'price': 13.268},
    {'name':'Late Night @ Pierce Dining Hall', 'price': 9.3625},
    {'name':'Any meal @ America\'s Cup', 'price': 10.432500000000001},
    {'name':'Any meal @ Chop\'d & Wrap\'d', 'price': 12.1873},
    {'name':'Any meal @ Red & Gray Cafe', 'price': 10.432500000000001},
    {'name':'Breakfast @ Colonel John\'s - Grill Nation', 'price': 7.5435},
    {'name':'Lunch/Dinner @ Colonel John\'s - Grill Nation', 'price': 11.737900000000002},
    {'name':'Any meal @ Colonel John\'s - Asian Express', 'price': 11.545300000000001},
    {'name':'Any meal @ Colonel John\'s - Personal Pizza', 'price': 7.7575}
];
var planArr = [
    {'name':'Platinum', 'price': 9.38082191780822},
    {'name':'Gold', 'price': 9.876923076923077},
    {'name':'Silver', 'price': 12.988439306358382},
    {'name':'80 meals', 'price': 13.04878048780488},
    {'name':'60 meals', 'price': 13.155737704918034},
    {'name':'25 meals', 'price': 14.98}
];
