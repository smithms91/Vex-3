import Link, { LinkProps } from 'next/link'
import { HTMLProps } from 'react'

type LinkParamProps = React.PropsWithChildren<Omit<LinkProps, "replace" | "scroll"> & HTMLProps<HTMLAnchorElement>>;

const LinkParam = ({ children, ...rest }: LinkParamProps) => {
  return (
    <Link replace={true} scroll={false} {...rest}>
      {children}
    </Link>
  )
}

export default LinkParam