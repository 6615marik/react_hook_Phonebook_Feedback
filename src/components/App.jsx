import React, { useState, useEffect } from 'react';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Noification } from './Notify/Notification';
import { Form } from './Form/Form';
import { Contacts } from './Form/Contacts';
import { Filtr } from './Form/Filtr';
// import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';

export const App = () => {
  const [good, SetGood] = useState(0);
  const [neutral, SetNeutral] = useState(0);
  const [bad, SetBad] = useState(0);
  const [contacts, SetContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: '1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: '2', name: 'Hermione Kline', number: '443-89-12' },
        { id: '3', name: 'Eden Clements', number: '645-17-79' },
        { id: '4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filtr, SetFiltr] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onIncrement = e => {
    const { name } = e.target;
    if (name === 'good') SetGood(prev => prev + 1);
    if (name === 'bad') SetBad(prev => prev + 1);
    if (name === 'neutral') SetNeutral(prev => prev + 1);
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };
  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100);
  };

  const onFormData = data => {
    console.log(data);

    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    const newContact = {
      id: nanoid(),
      ...data,
    };
    SetContacts(contacts => {
      return [...contacts, newContact];
    });
  };

  const onFiltrData = e => {
    const { value } = e.target;
    SetFiltr(value);
  };

  const onFilterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filtr.toLowerCase())
    );
  };
  const onRemoveContact = id =>
    SetContacts(contacts => contacts.filter(contact => contact.id !== id));

  let total = countTotalFeedback();
  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={{ good, bad, neutral }}
          onLeaveFeedback={onIncrement}
        />
        {total === 0 ? (
          <Noification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
      <Form onSubmit={onFormData} />
      <Filtr filtr={filtr} onFiltr={onFiltrData} />
      <Contacts
        onRemove={onRemoveContact}
        contacts={onFilterContacts(filtr, contacts)}
      />
    </>
  );
};
