import React from "react"
import styles from "./Animate.module.css"

export const Animate =
  <P extends object>(animation: "tada" | "wobble") =>
  (BaseComponent: React.ComponentType<P>) => {
    const AnimatedComponent = (props: P) => {
      const [cursorHovering, setCursorHovering] = React.useState(false)

      const handleMouseEnter = () => {
        setCursorHovering(true)
      }

      const handleMouseLeave = () => {
        setCursorHovering(false)
      }

      return (
        <div
          className={
            !cursorHovering ? styles.default : animation == "tada" ? styles.tadaAnimation : styles.wobbleAnimation
          }
          onMouseEnter={() => {
            handleMouseEnter()
          }}
          onMouseLeave={() => {
            handleMouseLeave()
          }}
        >
          <BaseComponent {...props} />
        </div>
      )
    }
    return AnimatedComponent
  }

Animate.displayName = "Animate"

export default Animate
