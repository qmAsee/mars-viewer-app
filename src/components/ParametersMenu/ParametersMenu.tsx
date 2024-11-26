import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDate, setRover } from '@/store/slices/querySlice.js'
import { fetchPhotos, setPage, setPhotos } from '@/store/slices/photoSlice.js'
import { RootState } from '@/store/store.js'
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { formatDate } from '../../utils/functions.js'

export default function ParametersMenu() {
  const dispatch = useDispatch()
  const earthDate = useSelector((state: RootState) => state.queryReducer.earthDate)
  const rover = useSelector((state: RootState) => state.queryReducer.rover)

  function onSelectDate(newDate) {
    const formattedDate = formatDate(newDate)
    dispatch(setDate(formattedDate))
  }

  function onSelectRover(rover) {
    dispatch(setRover(rover))
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(setPhotos([]));
    dispatch(fetchPhotos());
    dispatch(setPage(1));
  }

  return (
    <section className='flex align-center justify-center mb-10'>
      <form onSubmit={handleSubmit} className='flex gap-5' name='query_form' id='query_form'>
      <Select value={rover} onValueChange={onSelectRover}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choose a rover" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="curiosity">Curiosity</SelectItem>
          <SelectItem value="opportunity">Opportunity</SelectItem>
          <SelectItem value="spirit">Spirit</SelectItem>
        </SelectContent>
      </Select>
        <Popover>
            <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !earthDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {earthDate ? format(earthDate, "PPP") : <span>Pick a date on Earth</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={earthDate}
                  onSelect={onSelectDate}
                  captionLayout='dropdown'
                  fromYear={1990}
                  toYear={2024}
                />
            </PopoverContent>
        </Popover>
        <Button disabled={rover === '' || earthDate === ''} type='submit' className='h-40px'>Find</Button>
      </form>
    </section>
  )
}
