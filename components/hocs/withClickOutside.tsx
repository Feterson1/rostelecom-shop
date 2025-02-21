import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'
import { IWrappedComponentProps } from '@/types/hocs'

export function withClickOutside(
  WrappedComponent: ForwardRefExoticComponent<
    IWrappedComponentProps & RefAttributes<HTMLDivElement>
  >,
) {
  const Component = () => {
    const [open, setOpen] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (!ref.current?.contains(e.target as HTMLDivElement)) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [ref])
    return <WrappedComponent open={open} setOpen={setOpen} ref={ref} />
  }
  return Component
}
