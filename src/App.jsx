import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import PlannerProvider from './components/BookingCTA.jsx'
import Home from './pages/Home.jsx'

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <PlannerProvider>
          <Home />
        </PlannerProvider>
      </MotionConfig>
    </LazyMotion>
  )
}
