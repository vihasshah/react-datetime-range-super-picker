import React from 'react';
import { get } from "lodash";

export default class StyleSelector extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			theme : props.theme || '',
			colors : {
				primary_color: get(props, 'colors.primary_color', ''),
				primary_highlight_color: get(props, 'colors.primary_highlight_color', ''),
				primary_font_color: get(props, 'colors.primary_font_color', ''),
				light_font_color: get(props, 'colors.light_font_color', ''),
				secondary_color: get(props, 'colors.secondary_color', ''),
				secondary_highlight_color: get(props, 'colors.secondary_highlight_color', ''),
			}
		}
	}

	handleThemeUpdate = (e) => {
		this.setState({theme: e.target.value})
	}

	handleColorUpdate = (e) => {
		const colors = {...this.state.colors}
		colors[e.target.name] = e.target.value
		this.setState({colors})
	}

	handleSubmit = () => {
		// remove color if empty
		let colors = {...this.state.colors}
		for (const color in colors) {
			if (colors.hasOwnProperty(color)) {
				if(!colors[color]) delete colors[color];
			}
		}

		this.props.handlePropsUpdate({
			...this.props.pickerProps, 
			colors,
			theme: this.state.theme
		})
	}

	render = () => {
		const {theme} = this.state
		const {primary_color, secondary_color, 
			primary_font_color, light_font_color,
			secondary_highlight_color, primary_highlight_color} = this.state.colors

		return (
			<div className='form-wrapper'>
				<div className="row">
					<div className="col s12">
						<h3>Style Selector</h3>

						<label>Theme</label>
						<input placeholder="light, dark" value={theme} 
							onChange={this.handleThemeUpdate} />

						<label>Primary Color</label>
						<input placeholder="rgb, hex, color name ..." 
							value={primary_color} name="primary_color"
							onChange={this.handleColorUpdate} />

						<label>Primary highlight Color</label>
						<input placeholder="rgb, hex, color name ..." 
							value={primary_highlight_color} name="primary_highlight_color"
							onChange={this.handleColorUpdate} />

						<label>Secondary Color</label>
						<input placeholder="rgb, hex, color name ..." 
							value={secondary_color} name="secondary_color"
							onChange={this.handleColorUpdate} />

						<label>Secondary highlight Color</label>
						<input placeholder="rgb, hex, color name ..." 
							value={secondary_highlight_color} name="secondary_highlight_color"
							onChange={this.handleColorUpdate} />

						<label>Primary font Color</label>
						<input placeholder="rgb, hex, color name ..." 
							value={primary_font_color} name="primary_font_color"
							onChange={this.handleColorUpdate} />

						<label>Light font Color</label>
						<input placeholder="rgb, hex, color name ..." 
							value={light_font_color} name="light_font_color"
							onChange={this.handleColorUpdate} />
					</div>
				</div>
				<div className='submit-btn-wrapper'>
					<button className="btn waves-effect waves-light" onClick={this.handleSubmit} >
						Update Style
						<i className="material-icons right">send</i>
					</button>
				</div>
			</div>
		)
	}
}