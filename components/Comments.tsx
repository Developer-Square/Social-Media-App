import React, { Dispatch, SetStateAction } from 'react';

import useAuthStore from '../store/authStore';
import { NoResults, ProfileName } from '.';
import { NextPage } from 'next';
import Link from 'next/link';

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id?: string };
}

const Comments: NextPage<IProps> = ({
  isPostingComment,
  comment,
  comments,
  addComment,
  setComment,
}) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[475px]'>
        {comments?.length ? (
          comments.map((item: IComment) => (
            <div key={item.postedBy._ref}>
              {allUsers.map(
                (user) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className='p-2 items-center' key={item._key}>
                      <Link href={`/profile/${user._id}`}>
                        <div className='flex items-center gap-3'>
                          <ProfileName
                            userName={user.userName}
                            image={user.image}
                            _id={''}
                            _type={''}
                          />
                        </div>
                      </Link>
                      <div>
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </div>
          ))
        ) : (
          <NoResults text='No comments yet' />
        )}
      </div>

      {Object.keys(userProfile).length ? (
        <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
          <form onSubmit={addComment} className='flex gap-4'>
            <input
              type='text'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Add comment...'
              className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            />
            <button className='text-md text-gray-400' onClick={addComment}>
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Comments;
