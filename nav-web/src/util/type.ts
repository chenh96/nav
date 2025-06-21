import { ReactNode } from 'react'

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>

export type ReadonlyOrNot<T> = T | Readonly<T>

export type Children = ReactNode[] | ReactNode | string | number | boolean | null | undefined
