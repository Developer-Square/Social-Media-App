import { NextPage } from 'next';
import React from 'react';
import { Video } from '../types';

interface IProps {
  post: Video;
  key: string;
}

const VideoCard: NextPage<IProps> = ({ post, key }) => {
  return <div>VideoCard</div>;
};

export default VideoCard;
