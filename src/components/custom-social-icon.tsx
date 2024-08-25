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

  const getBorderRadius = (rounded: string) => {
    switch (rounded) {
      case 'small':
      case 'color_small':
        return 'rounded-sm';
      case 'large':
      case 'color_large':
        return 'rounded-lg';
      case 'full':
      case 'color_full':
        return 'rounded-full';
      default:
        return 'rounded-full';
    }
  };

  if (network === 'phone') {
    const borderRadius = getBorderRadius(rounded);
    console.log(borderRadius)
    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.8rem] w-[25px] h-[25px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-green-600')} >
        <Phone size={props.edit ? 16 : 26} className={props.edit ? 'text-black/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'website') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-blue-400')} >
        <Chrome size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'email') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-gray-600')} >
        <Mail size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'instagram') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]')} >
        <Instagram size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'linkedin') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-[#225982]')} >
        <Linkedin size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'x') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-black')} >
        <Image src="/x-white.svg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='X Logo' />
      </div>
    );
  }

  if (network === 'facebook') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-[#1877F2]')} >
        <Facebook size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'youtube') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-red-700')} >
        {/* <Youtube size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} /> */}
        <Image src="/youtube-white.svg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='YouTube Logo' />
      </div>
    );
  }

  if (network === 'snapchat') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-[#FFFC00]')} >
        {/* <Youtube size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} /> */}
        <Image src="/snapchat.svg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='Snapchat Logo' />
      </div>
    );
  }

  if (network === 'tiktok') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-black')} >
        {/* <Youtube size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} /> */}
        <Image src="/tiktok.svg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='TikTok Logo' />
      </div>
    );
  }

  if (network === 'twitch') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-[#6441a5]')} >
        <Image src="/twitch.svg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='Twitch Logo' />
      </div>
    );
  }

  if (network === 'threads') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-black')} >
        <Image src="/threads.jpg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='Threads Logo' />
      </div>
    );
  }

  if (network === 'address') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-black')} >
        <MapPin size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'signal') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.6rem] w-[32px] h-[32px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-[#3A76EF]')} >
        <Image src="/Signal-Logo.png" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='Signal Logo' />
      </div>
    );
  }

  if (network === 'venmo') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.45rem] w-[36px] h-[36px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-green-600')} >
        <Image src="/venmo.png" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='Venmo Logo' />
      </div>
    );
  }

  if (network === 'cashapp') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.35rem] w-[40px] h-[40px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-[#00D836]')} >
        <Image src="/cashapp.png" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='CashApp Logo' />
      </div>
    );
  }

  if (network === 'paypal') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.75rem] w-[26px] h-[26px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-[#008CFF]')} >
        <Image src="/paypal.svg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='PayPal Logo' />
      </div>
    );
  }

  if (network === 'discord') {
    const borderRadius = getBorderRadius(rounded);

    return (
      <div className={cn(`flex items-center justify-center box-content ${borderRadius}`, props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.015rem] w-[50px] h-[50px]', rounded.includes("color") ? 'bg-gradient-to-br from-card-bg-light to-card-bg-dark' : 'bg-[#5865F2]')} >
        <Image src="/discord-icon.jpg" width={props.edit ? 16 : 36} height={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} alt='Discord Logo' />
      </div>
    );
  }

  const borderRadius = getBorderRadius(rounded);
  return <SocialIcon className={`${borderRadius}`} style={props.edit ? { height: 25, width: 25 } : { height: 50, width: 50 }} network={network} {...props} />;
};

export default MySocialIcon;