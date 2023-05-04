import React from "react"

export function useAnimate() {
  const [cursorHovering, setCursorHovering] = React.useState(false)

  const handleMouseEnter = () => {
    setCursorHovering(true)
  }

  const handleMouseLeave = () => {
    setCursorHovering(false)
  }

  const output = {
    hovered: cursorHovering,
    props: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  }

  return output
}
