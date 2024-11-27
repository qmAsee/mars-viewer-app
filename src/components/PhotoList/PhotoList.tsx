import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import PhotoElement from '@/components/PhotoElement/PhotoElement'
// import Spinner
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../ui/Spinner'
import PaginationBar from '../PaginationBar/PaginationBar'
import { setShowedPhotos, setPage } from '@/store/slices/photoSlice'
import { IPhoto } from '@/types/types'

export default function PhotoList() {
  const dispatch = useDispatch()
  const photos = useSelector(state => state.photosReducer.photos)
  const showedPhotos = useSelector(state => state.photosReducer.showedPhotos)
  const itemsPerPage = useSelector(state => state.photosReducer.itemsPerPage)
  const status = useSelector(state => state.photosReducer.status)
  const error = useSelector(state => state.photosReducer.error)
  const photoList = useRef(null)

  const [isEmpty, setIsEmpty] = useState(false)
  
  useEffect(() => {
    dispatch(setShowedPhotos())
    console.log(photoList.current.children.length)
  }, [photos])

  useEffect(() => {
    if (photoList.current) {
      setIsEmpty(photoList.current.children.length === 0)
      console.log(isEmpty)
    }
  }, [showedPhotos])


  return (
    <section className='flex flex-wrap gap-5 align-center justify-center mb-6'>
        {
          isEmpty && 
          <div className="flex flex-wrap gap-5 align-center justify-center">
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <div
                  key={index}
                  className="w-[200px] h-[150px] bg-gray-300 animate-pulse rounded"
                ></div>
              ))}
            </div>
        }
        {
          photos.length > itemsPerPage && <PaginationBar />
        }

        {
          status === 'loading' && <Spinner />
        }
        
        <ul ref={photoList} className='flex flex-wrap gap-5 align-center justify-center'>
          {
            showedPhotos.length > 0 && status === 'succeeded' &&
              (
                showedPhotos.map((photo: IPhoto) => {
                  return <PhotoElement data={photo} key={photo.id}/>
                })
              )
          }

          {
            showedPhotos.length === 0 && status === '' && <span>Select a date on Earth and a rover</span>
          }

          {
            status === 'failed' && <span>{error}</span>
          }

          { 
            photos.length === 0 && status === 'succeeded' && <span>Photos not found</span>
          }
        </ul>

        {
          photos.length > itemsPerPage && <PaginationBar />
        }
{/* 
        {
          photoList.current.children.length && (
            <div className="flex flex-wrap gap-5 align-center justify-center">
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <div
                  key={index}
                  className="w-[200px] h-[150px] bg-gray-300 animate-pulse rounded"
                ></div>
              ))}
            </div>
          )
        } */}
    </section>
  )
}
