/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */


export const primaryColors = {
  '50': '#f0fdfa',
  '100': '#ccfbf1',
  '200': '#99f6e4',
  '300': '#5eead4',
  '400': '#2dd4bf',
  '500': '#14b8a6',
  '600': '#0d9488',
  '700': '#0f766e',
  '800': '#115e59',
  '900': '#134e4a',
  '950': '#042f2e',
}

const tintColorLight = primaryColors[500];
const tintColorDark = primaryColors[50];

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

