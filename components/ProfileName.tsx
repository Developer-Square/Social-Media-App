import React from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';

import { IUser } from '../types';

interface IProps extends IUser {
  location: boolean;
}

const ProfileName = ({ userName, image, location }: IProps) => {
  return (
    <>
      <div className={location ? '' : `w-8 h-8`}>
        <Image
          src={image}
          width={location ? 50 : 34}
          height={location ? 50 : 34}
          className='rounded-full'
          alt='user profile'
        />
      </div>

      <div className='hidden xl:block'>
        <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
          {userName.replaceAll(' ', '')}
          <GoVerified className='text-blue-400' />
        </p>
        <p className='capitalize text-gray-400 text-xs'>{userName}</p>
      </div>
    </>
  );
};

export default ProfileName;
