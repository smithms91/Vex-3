import React from 'react'
import Image from 'next/image'
import { TrendingUp } from 'lucide-react'
import StyleThemeModal from '../modals/style-theme-modal';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { getProfilePicture } from '@/queries';

type Props = {
  user: PostgrestSingleResponse<any[]>
}

const ProfileFooter = async (props: Props) => {
  const profilePicture = await getProfilePicture();

  return (
    <footer className='fixed bottom-0 left-0 right-0 max-w-[450px] mx-auto bg-white rounded-t-[26px] h-20 p-4 flex items-center justify-around z-50'>
      <div className='flex flex-col items-center'>
        <TrendingUp size={22} color='black' />
        <p className='text-xs uppercase'>Insights</p>
      </div>
      <Image src={profilePicture || '/profile.jpg'} className='rounded-full border-2 border-card-bg-dark p-1 box-content w-9' alt='Profile Picture' width={22} height={22} />
      <StyleThemeModal />
    </footer>
  )
}

export default ProfileFooter