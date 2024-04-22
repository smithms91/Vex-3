'use client';

import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import './embla.css'
import { features } from '@/constants'

type Props = {

}

const PaidCarousel = ({ }: Props) => {
  const options: EmblaOptionsType = { loop: true }
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {features.map((item, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <p>{item.icon}</p>
                {item.title}
                <p className='text-xs text-center'>{item.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PaidCarousel