import axios from 'axios';
import { NoResults, VideoCard } from '../components';

import { Video } from '../types';

interface IProps {
  videos: Video[];
}

export default function Home({ videos }: IProps) {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length ? (
        videos.map((video: Video) => (
          <div key={video._id}>
            <VideoCard post={video} key={video._id} />
          </div>
        ))
      ) : (
        <NoResults text='No Videos' />
      )}
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get('http://localhost:3000/api/post');

  return {
    props: {
      videos: data,
    },
  };
};
