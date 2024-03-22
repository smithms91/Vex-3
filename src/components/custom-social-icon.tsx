import { SocialIcon } from 'react-social-icons';
import * as React from 'react';
import { Chrome, Instagram, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MySocialIconProps {
  network: string;
  [key: string]: any;
}

const MySocialIcon: React.FC<MySocialIconProps> = ({ network, ...props }) => {
  if (network === 'phone') {
    return (
      <div className={cn('flex items-center justify-center rounded-full box-content bg-green-600', props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.8rem] w-[25px] h-[25px]')} >
        <Phone size={props.edit ? 16 : 26} className={props.edit ? 'text-black/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'website') {
    return (
      <div className={cn('flex items-center justify-center rounded-full box-content bg-blue-400', props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]')} >
        <Chrome size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} />
      </div>
    );
  }

  if (network === 'instagram') {
    return (
      <div className={cn('flex items-center justify-center rounded-full box-content bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.7rem] w-[28px] h-[28px]')} >
        <Instagram size={props.edit ? 16 : 36} className={props.edit ? 'text-white/75' : 'text-white'} />
      </div>
    );
  }

  return <SocialIcon style={props.edit ? { height: 25, width: 25 } : { height: 50, width: 50 }} network={network} {...props} />;
};

export default MySocialIcon;