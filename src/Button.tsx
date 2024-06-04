import type { ComponentProps } from "react"

type ButtonProps = {
  outline?: boolean
} & ComponentProps<"button">

export default function Button({ outline, ...props }: ButtonProps) {
  console.log({...props})
  return (
    <button
      style={{ border: outline ? "1px solid red" : undefined }}
      {...props}
    ></button>
  )
}
