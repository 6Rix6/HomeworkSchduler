import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
const HamburgerMenuIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#000"
    stroke="#fff"
    viewBox="-0.5 0 25 25"
    width={30}
    height={30}
    {...props}
  >
    <G
      stroke="#fff"
      fill="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Path d="M2 12.32h20M2 18.32h20M2 6.32h20" />
    </G>
  </Svg>
)
export default HamburgerMenuIcon
