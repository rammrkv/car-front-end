import { useDispatch } from 'react-redux'
import useInterval from '../lib/useInterval'
import Clock from './clock'
import Counter from './counter'
import Nav from './nav'

export default function Page() {
  const dispatch = useDispatch()

  // Tick the time every second


  return (
    <>
      <Nav />
      <Counter />
    </>
  )
}
