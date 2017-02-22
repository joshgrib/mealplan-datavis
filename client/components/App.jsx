import React from 'react';
import ReactDOM from 'react-dom';

import { Container, Row, Col } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Table } from 'reactstrap';

import { AppHeader } from './AppHeader.jsx';
import { TodoApp } from './TodoApp.jsx';

let mData = require('../data/meals/meals.js');
let pData = require('../data/plans/plans.js');

export default class App extends React.Component {
    indexedObjToList(obj) {
        //{0:{a}, 1:{b}, 2:{c}, ...} => [{a}, {b}, {c}, ...]
        return obj;
    }
    render() {
        return (
            <div>
                <TodoApp/>
                <Container id="joshApp">
                    <Row id="joshHeader">
                        <AppHeader/>
                    </Row>
                    <Row id="joshMain">
                        <Col  sm="12" md="3">
                            <header>
                                <h3>Meal plan costs and values</h3>
                            </header>
                            <h4>Meal Plans</h4>
                            <ListGroup>
                                {planArr.map((planObj) => {
                                    return (
                                        <ListGroupItem key={planObj.name}>
                                            <b>{planObj.name}</b><br/>
                                            ${planObj.price.toFixed(2)}
                                        </ListGroupItem>
                                    )
                                })}
                            </ListGroup>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                            </Table>
                            <h4>Maximum Values</h4>
                            <ListGroup>
                                {mealArr.map((mealObj) => {
                                    return (
                                        <ListGroupItem key={mealObj.name}>
                                            <b>{mealObj.name}</b><br/>
                                            ${mealObj.price.toFixed(2)}
                                        </ListGroupItem>
                                    )
                                })}
                            </ListGroup>

                        </Col>
                        <Col sm="12" md="9">
                            <header>
                                <h3>Meal plan cost VS value chart</h3>
                            </header>
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
