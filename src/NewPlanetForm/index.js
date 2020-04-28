import React, {Component} from 'react'
import {Form, Button, Label, Segment} from 'semantic-ui-react'

export default class NewPlanetForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			planet_type: '',
			length_of_year: '',
			moons: ''
		}
	}
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit = (event) => {
		event.preventDefault()
		this.props.addPlanet(this.state)
	}
	render() {
		// console.log('this.state in render() in NewPlanetForm')
		// console.log(this.state)
		return(
			<Segment>
				<h4>Discovered a planet? Add It!</h4>
				<Form onSubmit={this.handleSubmit}>
					<Label>Name</Label>
					<Form.Input
						type='text'
						name='name'
						value={this.state.name}
						placeholder='Enter Planet Name'
						onChange={this.handleChange}
					/>
					<Label>Planet Type</Label>
					<Form.Input
						type='text'
						name='planet_type'
						value={this.state.planet_type}
						placeholder='Enter Planet Type'
						onChange={this.handleChange}
					/>
					<Label>Length of Year</Label>
					<Form.Input
						type='text'
						name='length_of_year'
						value={this.state.length_of_year}
						placeholder='Length of Year On Planet'
						onChange={this.handleChange}
					/>
					<Label>Moons</Label>
					<Form.Input
						type='number'
						name='moons'
						value={this.state.moons}
						placeholder='Number of Moons'
						onChange={this.handleChange}
					/>
					<Button type='Submit' inverted color='purple'>
        				Add Planet!
      				</Button>
				</Form>
			</Segment>
		)
	}
}