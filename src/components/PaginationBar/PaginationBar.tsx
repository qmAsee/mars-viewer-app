import {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPage, prevPage, nextPage, setShowedPhotos } from '../../store/slices/photoSlice'
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function PaginationBar() {
  const dispatch = useDispatch()
  const photos = useSelector((state) => state.photosReducer.photos);
  const currentPage = useSelector((state) => state.photosReducer.currentPage);
  const itemsPerPage = useSelector((state) => state.photosReducer.itemsPerPage);

  function handleCountNumberOfPages() {
    const pagesCount = Math.floor(photos.length / itemsPerPage)
    const numbersArr = [...Array(pagesCount).keys()].splice(1)
    return numbersArr;
  }

  function handleSetPage(e) {
    dispatch(setPage(Number(e.target.textContent)))
    dispatch(setShowedPhotos());
  }

  function handlePrevPage() {
    dispatch(prevPage())
    dispatch(setShowedPhotos());
  }

  function handleNextPage() {
    dispatch(nextPage())
    dispatch(setShowedPhotos());
  }

  useEffect(() => {
    handleCountNumberOfPages()
  }, [photos.length, currentPage])

  return (
    <div className='flex items-center'>
      {
        handleCountNumberOfPages().length > 0
        &&
        <button disabled={currentPage === 1} onClick={handlePrevPage}  className='disabled:opacity-20'>
          <ChevronLeft className='cursor-pointer'/>
        </button>
      }
      <ul className="flex flex-nowrap whitespace-nowrap overflow-x-auto max-w-1/2 scrollbar-hide ml-2 mr-2">
        {
          handleCountNumberOfPages().map((item) => (
            <li
              key={item}  // ключ должен быть на элементе списка
              className={`flex w-10 h-10 justify-center items-center rounded-md ${item === currentPage ? 'bg-slate-300' : ''}`}
            >
              <span onClick={handleSetPage} className="cursor-pointer text-center leading-10 w-full">
                {item}
              </span>
            </li>
          ))
        }
      </ul>
      {
        handleCountNumberOfPages().length > 0
        &&
        <button disabled={currentPage === handleCountNumberOfPages().length} onClick={handleNextPage} className='disabled:opacity-20'>
          <ChevronRight className='cursor-pointer' />
        </button>
      }
    </div>

  //   <div className="overflow-x-auto">
  //   <ul className="flex space-x-2">
  //     {handleCountNumberOfPages().map((item) => (
  //       <li
  //         key={item}
  //         className={`flex w-10 h-10 justify-center items-center rounded-md ${item === currentPage ? 'bg-slate-300' : ''}`}
  //       >
  //         <span
  //           onClick={handleSetPage}
  //           className="flex cursor-pointer justify-center text-center leading-10"
  //         >
  //           {item}
  //         </span>
  //       </li>
  //     ))}
  //   </ul>
  // </div>
  )
}