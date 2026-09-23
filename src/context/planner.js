import { createContext, useContext } from 'react'

export const PlannerContext = createContext({ openPlanner: () => {} })

/** Opens the "Plan My Trip" booking panel, optionally with preselected interests. */
export const usePlanner = () => useContext(PlannerContext)
