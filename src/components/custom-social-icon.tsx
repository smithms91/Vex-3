'use client';

import { SocialIcon } from 'react-social-icons';
import * as React from 'react';
import { Chrome, Facebook, Instagram, Linkedin, LocateIcon, Mail, MapPin, Phone, Pin, PinIcon, X, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIconBorder } from './context/icon-border-provider';
import Image from 'next/image';

interface MySocialIconProps {
  network: string;
  [key: string]: any;
}

const MySocialIcon: React.FC<MySocialIconProps> = ({ network, ...props }) => {
  const { rounded, setRounded } = useIconBorder();

  const borderRadius =
    rounded === 'small' ? 'rounded-sm' :
      rounded === 'large' ? 'rounded-lg' :
        rounded === 'full' ? 'rounded-full' : 'rounded-full';

  if (network === 'phone') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-green-600 ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.8rem] w-[25px] h-[25px]')} >
        <Phone size={props.edit ? 16 : 26} className={props.edit ? 'text-black/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'website') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-blue-400 ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]')} >
        <Chrome size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'email') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-gray-600 ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]')} >
        <Mail size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'instagram') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]')} >
        <Instagram size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'linkedin') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-[#225982] ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]')} >
        <Linkedin size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'x') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-black ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]')} >
        <Image src="/x-white.svg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='X Logo' />
      </div>
    );
  }

  if (network === 'facebook') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-[#1877F2] ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]')} >
        <Facebook size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'youtube') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-red-700 ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]')} >
        {/* <Youtube size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} /> */}
        <Image src="/youtube-white.svg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='YouTube Logo' />
      </div>
    );
  }

  if (network === 'snapchat') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-[#FFFC00] ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]')} >
        {/* <Youtube size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} /> */}
        <Image src="/snapchat.svg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='Snapchat Logo' />
      </div>
    );
  }

  if (network === 'tiktok') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-black ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]')} >
        {/* <Youtube size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} /> */}
        <Image src="/tiktok.svg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='TikTok Logo' />
      </div>
    );
  }

  if (network === 'twitch') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-[#6441a5] ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]')} >
        <Image src="/twitch.svg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='Twitch Logo' />
      </div>
    );
  }

  if (network === 'threads') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-black ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]')} >
        <Image src="/threads.jpg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='Threads Logo' />
      </div>
    );
  }

  if (network === 'address') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-black ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]')} >
        <MapPin size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'signal') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-[#3A76EF] ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.6rem] w-[32px] h-[32px]')} >
        <Image src="/Signal-Logo.png" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='Signal Logo' />
      </div>
    );
  }

  if (network === 'venmo') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-[#008CFF] ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.45rem] w-[36px] h-[36px]')} >
        <Image src="/venmo.png" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='Venmo Logo' />
      </div>
    );
  }

  if (network === 'cashapp') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-[#00D836] ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.35rem] w-[40px] h-[40px]')} >
        <Image src="/cashapp.png" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='CashApp Logo' />
      </div>
    );
  }

  if (network === 'paypal') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-white ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.75rem] w-[26px] h-[26px]')} >
        <Image src="/paypal.svg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='PayPal Logo' />
      </div>
    );
  }

  if (network === 'discord') {
    return (
      <div className={cn(`flex items-center justify-center box-content bg-[#5865F2] ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.015rem] w-[50px] h-[50px]')} >
        <Image src="/discord-icon.jpg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='Discord Logo' />
      </div>
    );
  }

  return <SocialIcon className={`${borderRadius}`} style={props.edit ? { height: 25, width: 25 } : { height: 50, width: 50 }} network={network} {...props} />;
};

export default MySocialIcon;