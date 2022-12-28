import { NextPage } from 'next';
import React from 'react';

interface IProps {
  text: string;
}

const NoCard: NextPage<IProps> = ({ text }) => {
  return <div>NoCard</div>;
};

export default NoCard;
