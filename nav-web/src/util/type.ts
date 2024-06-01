export type Setter<T> = React.Dispatch<React.SetStateAction<T>>

export type ReadonlyOrNot<T> = T | Readonly<T>

export type Children = React.ReactNode[] | React.ReactNode | string | number | boolean | null | undefined
