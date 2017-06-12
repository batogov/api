import React from 'react';

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            employees: []
        }
    }

    getEmployees() {
        let city = this.refs.city.value;
        let position = this.refs.position.value;

        let queryString = `api/employees?city=${city}&position=${position}`;

        fetch(queryString).then(function(data) {
            return data.json();
        }).then(json => {
            this.setState({
                employees: json
            })
        });
    }

    renderEmployees() {
        if (this.state.employees.length === 0) {
            return (
                <div className="no-employees">
                    <span>There are no employees selected to show :(</span>
                </div>    
            )
        } else {
            return (
                <ul className="employees-list">
                    {this.renderEmployeesList()}
                </ul>
            )
        }
    }

    renderEmployeesList() {
        return this.state.employees.map((employee) => (
            <li className="employee-card" key={employee._id}>
                <div className={employee.available === true ? 'status' : 'status status--unavailable'}>
                    <div className="status__icon"></div>
                    <span className="status__title">
                        {employee.available === true ? 'Available' : 'Unavailable'}
                    </span>
                </div>
                <span className="employee-card__name">{employee.name}</span>
                <span className="employee-card__info">{`${employee.position}, ${employee.city}`}</span>
            </li>
        ));
    }

    render() {
        return (
            <div className="container">

                <div className="form-block">
                    <div className="select-block">
                        <label htmlFor="position">Position</label>
                        <select id="position" ref="position">
                            <option value="All">All</option>
                            <option value="iOS+Developer">iOS Developer</option>
                            <option value="Android+Developer">Android Developer</option>
                            <option value="UI+Designer">UI Designer</option> 
                        </select>
                    </div>

                    <div className="select-block">
                        <label htmlFor="city">City</label>
                        <select id="city" ref="city">
                            <option value="All">All</option>
                            <option value="San+Francisco">San Francisco</option>
                            <option value="New+York">New York</option>
                            <option value="Chicago">Chicago</option>
                        </select>
                    </div>

                    <button onClick={this.getEmployees.bind(this)}>Find!</button>
                </div>

                {this.renderEmployees()}

            </div>
        )
    }
}