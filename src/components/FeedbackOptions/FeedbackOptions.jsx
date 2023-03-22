// import { Component } from 'react';
import { Button } from './FeedbackOptions.styled';
export const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  const optikey = Object.keys(options);
  return optikey.map(options => {
    return (
      <Button
        key={options}
        type="button"
        name={options}
        onClick={onLeaveFeedback}
      >
        {options}
      </Button>
    );
  });
};
