import React from 'react'
import { DayPicker } from 'react-day-picker'

export default function Rdp() {
  return (
    <>
        <DayPicker
            captionLayout="dropdown"
            defaultMonth={new Date(2024, 6)}
            endMonth={new Date(2025, 9)}
        />
    </>
  )
}
