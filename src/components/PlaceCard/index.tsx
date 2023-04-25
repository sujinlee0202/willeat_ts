import React from 'react'
import styles from './styles.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Place } from '../../types/Place'
import ImageCarousel from '../ImageCarousel'

interface Props {
  place: Place
}

const PlaceCard = ({place}: Props) => {
  const {id, title, category, description, roadAddress, imageUrl, mapx, mapy} = place
  const navigate = useNavigate()

  const onClickCard = () => {
    navigate(`/search/${id}`, {
      state: {mapx, mapy}
    })
  }

  return (
    <li className='flex flex-col gap-1 w-full cursor-pointer p-7 border-b hover:bg-blue-50' onClick={onClickCard}>
      <div className='relative w-full h-48 aspect-w-1 aspect-h-1'>
        {imageUrl && <ImageCarousel url={imageUrl} />}
      </div>
      <div className='flex items-center gap-2 py-1'>
        <p className='text-lg font-bold text-blue-900'>{title}</p>
        <p className='text-sm text-gray-400'>{category}</p>
      </div>
      <p className='line-clamp-1 font-bold text-gray-700'>{description}</p>
      <p className='line-clamp-1 text-sm text-gray-400'>{roadAddress}</p>
    </li>
  )
}

export default PlaceCard