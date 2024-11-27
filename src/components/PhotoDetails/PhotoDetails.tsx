import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {setClickedPhoto} from '../../store/slices/photoSlice'
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import Footer from '../Footer/Footer';

export default function PhotoDetails() {
  const { photoId } = useParams()
  const photos = useSelector(state => state.photosReducer.photos)
  const clickedPhoto = photos.find((photo) => photo.id == photoId)
  
  if (!clickedPhoto) return <div>Фото не найдено</div>;

  useEffect(()=> {
    console.log(photos)
    document.title = `Photo ${clickedPhoto.id}`
  }, [])

  return (
    <>
      <Header />
      <article className='grid grid-cols-2 pl-10 gap-x-7 gap-y-3 box-border mb-10'>
        <div className='flex items-center'>
          <ChevronLeft className='opacity-50 w-5' />
          <Link className='text-l text-zinc-500' to="/">Back to photo list</Link>
        </div>
        <h2></h2>
        <div className='flex flex-col gap-5'>
          <h1 className='font-bold text-3xl'>Photo ID: {clickedPhoto.id}</h1>
          <img className='' src={clickedPhoto.img_src} />
        </div>
        <div className='flex flex-col gap-2'>
          <div>
          </div>
          <div className='flex flex-col pt-9 gap-4'>
            <h2 className='font-bold text-3xl mb-8'>Photo Info</h2>
            <p className='text-xl'>Earth Date: {clickedPhoto.earth_date}</p>
            <p className='text-xl'>Sol: {clickedPhoto.sol}</p>
            <p className='text-xl'>Camera: {clickedPhoto.camera.full_name}</p>
            <a className='text-xl underline' href={clickedPhoto.img_src}>Image Source</a>

            <Accordion className='w-1/2' type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className='text-xl'>Rover</AccordionTrigger>
                <AccordionContent>
                  <span>Name: {clickedPhoto.rover.name}</span>
                </AccordionContent>
                <AccordionContent>
                  <span>Launch date: {clickedPhoto.rover.launch_date}</span>
                </AccordionContent>
                <AccordionContent>
                  <span>Landing date: {clickedPhoto.rover.landing_date}</span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion className='w-1/2' type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className='text-xl'>Camera</AccordionTrigger>
                <AccordionContent>
                  <span>Name: {clickedPhoto.camera.full_name}</span>
                </AccordionContent>
                <AccordionContent>
                  <span>Short name: {clickedPhoto.camera.name}</span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </article>
      <Footer />
    </>
  )
}
