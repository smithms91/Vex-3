'use client';

import React, { useState } from 'react'
import { Switch } from '../ui/switch'
import { updateUserBranding } from '@/queries';

type Props = {
  vexBranding: boolean
}

const BrandingSwitch = ({ vexBranding }: Props) => {

  const handleCheckedChange = async (e: boolean) => {
    await updateUserBranding(!e)
  };

  return (
    <Switch defaultChecked={vexBranding} onCheckedChange={(e) => handleCheckedChange(e)} />
  )
}

export default BrandingSwitch