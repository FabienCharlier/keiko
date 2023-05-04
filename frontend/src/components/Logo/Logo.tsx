import { useAnimate } from "components/useAnimate"
import styles from "./Logo.module.css"

export const Logo = () => {
  const output = useAnimate()

  return (
    <img
      height={40}
      src="https://fontmeme.com/permalink/190314/03655fc9c0c5ef371245622978eaa0a7.png"
      alt="pokemon-go-font"
      {...output.props}
      className={output.hovered ? styles.logoHovered : styles.logoDefault}
    />
  )
}
