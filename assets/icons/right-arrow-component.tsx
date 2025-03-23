import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    fill="#000"
    stroke="#000"
    viewBox="0 0 330.002 330.002"
    width={20}
    height={15}
    style={{marginTop: "auto",marginBottom: "auto"}}
    strokeWidth={10}
    {...props}
  >
    <Path d="M233.252 155.997 120.752 6.001c-4.972-6.628-14.372-7.97-21-3-6.628 4.971-7.971 14.373-3 21l105.75 140.997-105.75 141.003c-4.971 6.627-3.627 16.03 3 21a14.93 14.93 0 0 0 8.988 3.001c4.561 0 9.065-2.072 12.012-6.001l112.5-150.004a15 15 0 0 0 0-18z" />
  </Svg>
)
export default SvgComponent
