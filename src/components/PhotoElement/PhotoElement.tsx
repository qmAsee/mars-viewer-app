import React from 'react'
import styles from './PhotoElement.module.scss'
import { IPhoto } from '@/types/types'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {setClickedPhoto} from '../../store/slices/photoSlice'

interface PhotoElementProps {
  data: IPhoto;
}

export default function PhotoElement({ data }: PhotoElementProps) {
  const clickedPhoto = useSelector(state => state.photosReducer.clickedPhoto)
  const photos = useSelector(state => state.photosReducer.photos)
  const dispatch = useDispatch()

  function handleChoosePhoto(photo) {
    dispatch(setClickedPhoto(photo))
    console.log(clickedPhoto)
  }


  return (
    <li className={`flex flex-col hover:scale-105 transition-all ${styles.element_container}`}>
      <Link state={photos} onClick={() => handleChoosePhoto(data)} to={`/${data.id}`} target='_blank'>
        <img src={data.img_src} className='w-80 rounded-md' loading='lazy'/> 
      </Link>
      <div className={styles.tooltip}>
        <span>Earth date: {data.earth_date}</span>
        <span>Rover: {data.rover.name}</span>
        <span>Camera: {data.camera.full_name}</span>
      </div>
    </li>
  )
}
