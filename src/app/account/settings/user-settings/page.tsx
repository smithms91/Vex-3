'use client';

import { useThemeColor } from '@/components/context/theme-color-provider';
import HeaderBackButton from '@/components/header-with-back-button';
import { SparklesCore } from '@/components/sparkles';
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { disableAccount, forgotUserPassword, getAccountDisabled, getAuthUserEmail } from '@/queries';
import { Lock, Mail, Pause, ShieldQuestion, Unlock, UserRound, UserRoundMinus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

type Props = {}

const UserSettingsPage = (props: Props) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const themeColor = useThemeColor();

  useEffect(() => {
    async function handleDisabledAccount() {
      const userDisabled = await getAccountDisabled();
      setDisabled(userDisabled!);
    }

    handleDisabledAccount();
  }, []);

  const handleForgotPassword = async () => {
    try {
      const email = await getAuthUserEmail();
      await forgotUserPassword(email!);
      toast(`Password reset email sent to this email: <strong>${email}</strong>. <br />Click the <strong>link</strong> in that email to reset your password.`, { position: 'top-center' });
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleDisableAccount = async (value: boolean) => {
    try {
      await disableAccount(value);
      setDisabled(value);
      toast(`Account has been ${value ? 'disabled' : 'enabled'}.`, { position: 'top-center' });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <main className='min-h-screen z-50 max-w-[450px] mx-auto flex flex-col items-center'>
      <HeaderBackButton title='Account Settings' link='account/settings' />
      <section className='flex flex-col gap-y-2 w-full p-6'>
        <Button onClick={() => router.push('/account/settings/user-settings/change-email')} className='flex justify-start bg-slate-600/50 inset-4 text-white w-full py-9 z-50'>
          <div className='flex items-center justify-center rounded-full box-content bg-blue-600/20 p-2'>
            <Mail size={18} color='white' />
          </div>
          <div className='flex flex-col items-start ml-4'>
            <h1 className={cn(`text-md`, themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>Change Email</h1>
          </div>
        </Button>
        <Button onClick={() => router.push('/account/settings/user-settings/update-username')} className='flex justify-start bg-slate-600/50 inset-4 text-white w-full py-9 z-50'>
          <div className='flex items-center justify-center rounded-full box-content bg-purple-600/20 p-2'>
            <UserRound size={18} color="white" />
          </div>
          <div className='flex flex-col items-start ml-4'>
            <h1 className={cn(`text-md`, themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>Update Username</h1>
          </div>
        </Button>
        <Button onClick={() => router.push('/account/settings/user-settings/update-password')} className='flex justify-start bg-slate-600/50 inset-4 text-white w-full py-9 z-50'>
          <div className='flex items-center justify-center rounded-full box-content bg-gray-800/20 p-2'>
            <Lock size={18} color="white" />
          </div>
          <div className='flex flex-col items-start ml-4'>
            <h1 className={cn(`text-md`, themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>Update Password</h1>
          </div>
        </Button>
        <Button onClick={() => handleForgotPassword()} className='flex justify-start bg-slate-600/50 inset-4 text-white w-full py-9 z-50'>
          <div className='flex items-center justify-center rounded-full box-content bg-green-400/20 p-2'>
            <Unlock size={18} color='white' />
          </div>
          <div className='flex flex-col items-start ml-4'>
            <h1 className={cn(`text-md`, themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>Forgot Password</h1>
          </div>
        </Button>
        <Button onClick={() => router.push('https://www.instagram.com/vexcards')} className='flex justify-start bg-slate-600/50 inset-4 text-white w-full py-9 z-50'>
          <div className='flex items-center justify-center rounded-full box-content bg-red-600/20 p-2'>
            <ShieldQuestion size={18} color='white' />
          </div>
          <div className='flex flex-col items-start ml-4'>
            <h1 className={cn(`text-md`, themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>About</h1>
          </div>
        </Button>
        <hr className='opacity-40 my-4 bg-slate-600/20' />
        <div className='relative z-50'>
          <Button className='flex justify-start bg-slate-600/50 inset-4 text-white w-full py-9 z-50'>
            <div className='flex items-center justify-center rounded-full box-content bg-red-600/20 p-2'>
              <Pause size={18} color='white' />
            </div>
            <div className='flex flex-col items-start ml-4'>
              <h1 className={cn(`text-md`, themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>Disable Account</h1>
            </div>
          </Button>
          <Switch className="absolute right-10 top-[1.65rem]" checked={disabled} onCheckedChange={(e) => handleDisableAccount(e)} />
        </div>
        <Button onClick={() => router.push('/account/settings/user-settings/delete-account')} className='flex justify-start bg-slate-600/50 inset-4 text-white w-full py-9 z-50'>
          <div className='flex items-center justify-center rounded-full box-content bg-red-600/20 p-2'>
            <UserRoundMinus size={18} color='white' />
          </div>
          <div className='flex flex-col items-start ml-4'>
            <h1 className={cn(`text-md`, themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>Delete Account</h1>
          </div>
        </Button>
      </section>
      <SparklesCore id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="max-w-[450px] mx-auto h-full absolute top-0 left-0 right-0 z-0"
        particleColor={themeColor["color"] === 'light' ? '#000000' : "#FFFFFF"} />
    </main>
  )
}

export default UserSettingsPage