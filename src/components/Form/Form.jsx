import { Component } from 'react';
// import { nanoid } from 'nanoid';
// import PropTypes from 'prop-types';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };
  formSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({
      // id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    });

    this.setState({ name: '', number: '' });
  };

  handleChangeForm = e => {
    // console.log(target);
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const { name, number } = this.state;
    return (
      <>
        <form onSubmit={this.formSubmit}>
          <label htmlFor={name}>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={this.handleChangeForm}
            />
            <label htmlFor={number} />
            Number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={this.handleChangeForm}
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
      </>
    );
  }
}
