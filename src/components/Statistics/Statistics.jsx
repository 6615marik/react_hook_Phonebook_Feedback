// import { Component } from 'react';
import { Stat } from './Statistics.styled';
export const Statistics = ({
  good,
  bad,
  neutral,
  total,
  positivePercentage,
}) => {
  return (
    <>
      <Stat>Good :{good}</Stat>
      <Stat>Bad :{bad}</Stat>
      <Stat>Neutral :{neutral}</Stat>
      <Stat>Total :{total}</Stat>
      <Stat>Positive feedback :{positivePercentage}%</Stat>
    </>
  );
};
