import theme from 'styled-theming';
import { darken, lighten } from '@library/utils/colours';
import { neutral } from './colours';

const card = theme('theme', {
  light: neutral.white,
  dark: neutral.grey5,
});

const cardPressed = theme('theme', {
  light: darken(neutral.white, 0.2),
  dark: lighten(neutral.offBlack, 0.2),
});

const background = theme('theme', {
  light: neutral.offWhite,
  dark: neutral.offBlack,
});

const headerTextColour = theme('theme', {
  light: neutral.black,
  dark: neutral.white,
});

const bodyTextColour = theme('theme', {
  light: neutral.grey4,
  dark: neutral.cream,
});

const detailTextColour = theme('theme', {
  light: neutral.grey4,
  dark: neutral.grey2,
});

const icon = theme('theme', {
  light: neutral.grey3,
  dark: neutral.grey2,
});

const inputTextColour = theme('theme', {
  light: neutral.offBlack,
  dark: neutral.offWhite,
});

export { card, cardPressed, background, headerTextColour, bodyTextColour, detailTextColour, icon, inputTextColour };
