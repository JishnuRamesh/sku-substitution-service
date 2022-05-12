import { ThemeOptions } from '@material-ui/core';
import { TypographyOptions, TypographyStyle } from '@material-ui/core/styles/createTypography';

export enum SPACINGS {
    XXL = 'xxl',
    xl = 'xl',
    lg = 'lg',
    md = 'md',
    sm = 'sm',
    xs = 'xs',
    xxs = 'xxs',
}

export const COLOURS = {
    LIGHT: 'light',
    NEUTRAL: 'neutral',
    PRIMARY: 'primary',
    NEGATIVE: 'negative',
};

export type ColoursType = 'primary' | 'light' | 'neutral' | 'negative';

interface Typography extends TypographyOptions {
    grandiose: TypographyStyle;
    bodyLarge: TypographyStyle;
    bodyText: TypographyStyle;
    bodyTextShort: TypographyStyle;
    bodyTitle: TypographyStyle;
    smallText: TypographyStyle;
    smallTextStrong: TypographyStyle;
    microText: TypographyStyle;
    microTextStrong: TypographyStyle;
    cta: TypographyStyle;
    navDefault: TypographyStyle;
    label: TypographyStyle;
    link: TypographyStyle;
    linkSmall: TypographyStyle;
}

export type Theme = ThemeOptions & {
    layout: any;
    overrides: any;
    palette: {
        type: 'light' | 'dark';
        negative: any;
        light: any;
        positive: any;
        neutral: any;
        reward: any;
    };
    typography: Typography;
};
