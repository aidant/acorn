import { formatDistance } from 'date-fns'
import { useEffect, useState } from 'react'

export const useTimeRelative = (timestamp: Date) => {
  const [date, setDate] = useState(new Date())
  const [text, setText] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    setText(formatDistance(date, timestamp, { includeSeconds: true }))
  }, [date, timestamp])

  return text
}
