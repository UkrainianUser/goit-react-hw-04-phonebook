import React, {useState} from "react";
import css from "./ContactForm.module.css";
import PropTypes from 'prop-types';

export default function ContactForm ({onSubmit}) {

	const [name, setName] = useState('');
	const [number, setNumber] = useState('');
	
	const handleChange = evt => {
		const { name, value } = evt.currentTarget;
		switch (name) {
			case 'name':
				setName(value);
				break;
			case 'number':
				setNumber(value);
				break;
			default:
				break;
		}
	};
	
	
	const reset = () => {
		setName('');
		setNumber('');
	};

	const handleSubmit = evt => {
    evt.preventDefault();
		onSubmit({name, number});
		reset();
  };

	return	<form className={css.form} onSubmit={handleSubmit}>
		<label className={css.label}>
			Name 
			<input
				className={css.input}
				type="text"
				name="name"
				pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
				title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
				required
				value={name} 
				onChange={handleChange}
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
				value={number} 
				onChange={handleChange}
			/>
		</label>
		<button className={css.formBtn} type="submit">Add contact</button>
		</form>
};

ContactForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};