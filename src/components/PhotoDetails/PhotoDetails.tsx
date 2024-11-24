import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {setClickedPhoto} from '../../store/slices/photoSlice'
import { useParams } from 'react-router-dom';

export default function PhotoDetails() {
  const { photoId } = useParams()
  const photos = useSelector(state => state.photosReducer.photos)
  const clickedPhoto = photos.find((photo) => photo.id == photoId)
  
  if (!clickedPhoto) return <div>Фото не найдено</div>;

  useEffect(()=> {
    console.log(photos)
  }, [])

  return (
    <div>
        <img src={clickedPhoto.img_src} />
    </div>
  )
}
