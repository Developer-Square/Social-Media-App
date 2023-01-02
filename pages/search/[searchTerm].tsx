import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { VideoCard, NoResults, ProfileName } from '../../components';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/authStore';

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';

  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='w-full'>
      <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className='md:mt-16'>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser) => (
              <Link href={`/profile/${user._id}`} key={user._id}>
                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                  <ProfileName
                    _id={''}
                    _type={''}
                    userName={user.userName}
                    image={user.image}
                    location
                  />
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No accounts results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
          {videos.length > 0 ? (
            videos.map((video) => (
              <div key={video._id}>
                <VideoCard post={video} />
              </div>
            ))
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: {
    searchTerm: string;
  };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: { videos: res.data },
  };
};

export default Search;
