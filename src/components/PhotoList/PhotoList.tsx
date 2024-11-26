import React, {useEffect, useLayoutEffect} from 'react'
import PhotoElement from '@/components/PhotoElement/PhotoElement'
// import Spinner
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../ui/Spinner'
import PaginationBar from '../PaginationBar/PaginationBar'
import { setShowedPhotos, setPage } from '@/store/slices/photoSlice'

export default function PhotoList() {
  const dispatch = useDispatch()
  const photos = useSelector(state => state.photosReducer.photos)
  const showedPhotos = useSelector(state => state.photosReducer.showedPhotos)
  const itemsPerPage = useSelector(state => state.photosReducer.itemsPerPage)
  const status = useSelector(state => state.photosReducer.status)
  const error = useSelector(state => state.photosReducer.error)
  
  useLayoutEffect(() => {
    // dispatch(setPage(1))
    dispatch(setShowedPhotos())
    console.log(photos)
    console.log(showedPhotos)
  }, [photos])

  return (
    <section className='flex flex-wrap gap-5 align-center justify-center mb-6'>
        {
          photos.length > itemsPerPage && <PaginationBar />
        }

        {
          status === 'loading' && <Spinner />
        }
        
        <ul className='flex flex-wrap gap-5 align-center justify-center'>
          {
            showedPhotos.length > 0 && status === 'succeeded' &&
              (
                showedPhotos.map((photo) => {
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
    </section>
  )
}
