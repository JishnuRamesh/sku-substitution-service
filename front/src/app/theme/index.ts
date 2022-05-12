import { Theme } from '@app/theme/types/theme';
import {
    customShadowFields,
    customShapeFields,
    customSpacingFields,
    readyToUseTypographyStyles,
} from './constants';
import { layout } from './layout';
import { palette } from './palette';

const theme: Theme = {
    layout,
    palette,
    typography: {
        fontFamily: `Source SansPro, sans-serif`,
        fontWeight: 600,
        // Custom typography fields are not supported in material-ui V4,
        // We can use styles which defined in the default theme https://next.material-ui.com/ru/customization/default-theme/
        ...readyToUseTypographyStyles,
        grandiose: {
            fontFamily: 'Agrandir Regular, sans-serif',
            fontWeight: 500,
            fontSize: '56px',
            lineHeight: '72px',
        },
        bodyLarge: {
            fontFamily: 'Source SansPro, sans-serif',
            fontWeight: 400,
            fontSize: '21px',
            lineHeight: '32px',
        },
        bodyText: {
            fontFamily: 'Source SansPro, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
        },
        bodyTextShort: {
            fontFamily: 'Source SansPro, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '20px',
        },
        bodyTitle: {
            fontFamily: 'Source SansPro, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '24px',
        },
        smallText: {
            fontFamily: 'Source SansPro, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
        },
        smallTextStrong: {
            fontFamily: 'Source SansPro, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
        },
        microText: {
            fontFamily: 'Source SansPro, sans-serif',
            fontWeight: 400,
            letterSpacing: '-0.18px',
            fontSize: '12px',
            lineHeight: '18px',
        },
        microTextStrong: {
            fontFamily: 'Source SansPro, sans-serif',
            fontWeight: 600,
            letterSpacing: '-0.18px',
            fontSize: '12px',
            lineHeight: '18px',
        },
        cta: {
            fontFamily: `'Agrandir Regular', sans-serif`,
            fontWeight: 500,
            letterSpacing: 0.7,
            fontSize: '16px',
            lineHeight: '20px',
            cursor: 'pointer',
            textAlign: 'center',
        },
        navDefault: {
            fontFamily: 'Source SansPro, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            cursor: 'pointer',
        },
        label: {
            fontFamily: 'Source SansPro, sans-serif',
            fontWeight: 600,
            letterSpacing: 0,
            fontSize: '12px',
            lineHeight: '16px',
            cursor: 'pointer',
            textTransform: 'uppercase',
        },
        link: {
            fontFamily: 'Source SansPro, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            textDecoration: 'underline',
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'none',
            },
        },
        linkSmall: {
            fontFamily: 'Source SansPro, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            textDecoration: 'underline',
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'none',
            },
        },
    },
    shape: {
        borderRadius: 4,
        ...customShapeFields,
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    backgroundColor: palette.neutral[200],
                },
                a: {
                    cursor: 'pointer',
                    color: palette.primary.main,
                    '&:hover': { textDecorationColor: palette.primary[600] },
                },
                '@font-face': [
                    {
                        fontFamily: 'Agrandir Regular',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        src: 'url("https://cdn.hellofresh.com/scm/fonts/Agrandir-HelloFresh_Regular.woff2") format("woff2")',
                    },
                    {
                        fontFamily: 'Agrandir Regular',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        src: 'url("https://cdn.hellofresh.com/scm/fonts/Agrandir-HelloFresh_Medium.ttf") format("opentype")',
                    },
                    {
                        fontFamily: 'Source SansPro',
                        fontStyle: 'normal',
                        fontWeight: 300,
                        src: 'url("https://cdn.hellofresh.com/scm/fonts/SourceSansPro-Light.otf.woff2") format("woff2")',
                    },
                    {
                        fontFamily: 'Source SansPro',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        src: 'url("https://cdn.hellofresh.com/scm/fonts/SourceSansPro-Regular.otf.woff2") format("woff2")',
                    },
                ],
            },
        },
    },
    ...customShadowFields,
    ...customSpacingFields,
};

export default theme;
