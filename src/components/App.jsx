import React, { Component } from 'react';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Noification } from './Notify/Notification';
import { Form } from './Form/Form';
import { Contacts } from './Form/Contacts';
import { Filtr } from './Form/Filtr';
// import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
    contacts: [
      { id: '1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: '2', name: 'Hermione Kline', number: '443-89-12' },
      { id: '3', name: 'Eden Clements', number: '645-17-79' },
      { id: '4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filtr: '',
  };

  componentDidMount() {
    try {
      const local = localStorage.getItem('contactLS');
      const contacts = JSON.parse(local);

      if (contacts) {
        this.setState({ contacts: contacts });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const contjson = JSON.stringify(this.state.contacts);
      localStorage.setItem('contactLS', contjson);
    }
  }

  onIncrement = e => {
    const { name } = e.target;
    this.setState(prevstate => ({ [name]: prevstate[name] + 1 }));
  };

  countTotalFeedback = () => {
    return this.state.good + this.state.neutral + this.state.bad;
  };
  countPositiveFeedbackPercentage = () => {
    return Math.round((this.state.good / this.countTotalFeedback()) * 100);
  };

  onFormData = data => {
    console.log(data);
    const { contacts } = this.state;
    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    const newContact = {
      id: nanoid(),
      ...data,
    };
    this.setState(({ contacts }) => {
      return { contacts: [...contacts, newContact] };
    });
  };

  onFiltrData = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onFilterContacts = () => {
    const { contacts, filtr } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filtr.toLowerCase())
    );
  };
  onRemoveContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));

  render() {
    const { good, bad, neutral, filtr, contacts } = this.state;
    let total = this.countTotalFeedback();

    console.log(this.state);
    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={{ good, bad, neutral }}
            onLeaveFeedback={this.onIncrement}
          />
          {total === 0 ? (
            <Noification message="There is no feedback" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
        <Form onSubmit={this.onFormData} />
        <Filtr filtr={filtr} onFiltr={this.onFiltrData} />
        <Contacts
          onRemove={this.onRemoveContact}
          contacts={this.onFilterContacts(filtr, contacts)}
        />
      </>
    );
  }
}
