import dayjs from 'dayjs'

export function getTimestamp() {
  const timestamp = dayjs().valueOf()
  return timestamp
}
