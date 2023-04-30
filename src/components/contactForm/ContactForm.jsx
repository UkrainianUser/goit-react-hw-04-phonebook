import React from "react";
import css from "./ContactForm.module.css";
import PropTypes from 'prop-types';

class ContactForm extends React.Component {

	state = {
		name: '',
    number: ''
	};
	
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
  };

	handleChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({[name]: value,});
  };

	handleSubmit = evt => {
    evt.preventDefault();
		this.props.onSubmit(this.state);
		this.reset();
  };

	reset = () => {
		this.setState({
			name: '',
			number: ''
		})
	};

	render(){
	return	<form className={css.form} onSubmit={this.handleSubmit}>
		<label className={css.label}>
			Name 
			<input
				className={css.input}
				type="text"
				name="name"
				pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
				title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
				required
				value={this.state.name} 
				onChange={this.handleChange}
			/>
		</label>
		<label className={css.label}>
			Number
			<input
				className={css.input}
				type="tel"
				name="number"
				pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
				title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
				required
				value={this.state.number} 
				onChange={this.handleChange}
			/>
		</label>
		<button className={css.formBtn} type="submit">Add contact</button>
		</form>
	}	
};

export default ContactForm;