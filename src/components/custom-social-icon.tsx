import { SocialIcon } from 'react-social-icons';
import * as React from 'react';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MySocialIconProps {
  network: string;
  [key: string]: any;
}

const MySocialIcon: React.FC<MySocialIconProps> = ({ network, ...props }) => {
  if (network === 'phone') {
    return (
      <div className={cn('flex items-center justify-center rounded-full box-content bg-green-400', props.edit ? 'p-[.2rem] w-[16px] h-[16px]' : 'p-[.9rem] w-[22px] h-[22px]')} >
        <Phone size={props.edit ? 16 : 26} className={props.edit ? 'text-black/75' : 'text-white'} />
      </div>
    );
  }

  return <SocialIcon style={props.edit ? { height: 25, width: 25 } : { height: 50, width: 50 }} network={network} {...props} />;
};

export default MySocialIcon;