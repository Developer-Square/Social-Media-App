import axios from 'axios';
import { NoResults, VideoCard } from '../components';

import { Video } from '../types';
import { BASE_URL } from '../utils';

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
  const { data } = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: {
      videos: data,
    },
  };
};
