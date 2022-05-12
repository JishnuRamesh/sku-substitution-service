import { SPACINGS } from '@app/theme/types/theme';

export const customShapeFields = {
    radius: {
        sm: '2px',
        md: '4px',
        lg: '8px',
        xl: '12px',
        full: '999px',
    },
};

// ts and mui do not work well together here as mui is expecting 25 shadow types in their theme - therefore leaving it as `any` for now.
export const customShadowFields: any = {
    shadows: [
        'none',
        'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px',
        'rgba(0, 0, 0, 0.15) 0px 2px 4px 0px',
        'rgba(0, 0, 0, 0.15) 0px 3px 8px 0px',
        'rgba(0, 0, 0, 0.20) 0px 4px 16px 0px;',
    ],
};

const spacingValues = {
    xxl: '56px',
    xl: '40px',
    lg: '32px',
    md: '24px',
    sm: '16px',
    xs: '8px',
    xxs: '4px',
};

export const customSpacingFields = {
    setSpacing: (size: SPACINGS) =>
        spacingValues.hasOwnProperty(size) ? spacingValues[size] : '0px',
};

export const readyToUseTypographyStyles = {
    h1: {
        fontFamily: 'Agrandir Regular, sans-serif',
        fontWeight: 500,
        fontSize: '48px',
        lineHeight: '60px',
        color: '#000000',
    },
    h2: {
        fontFamily: 'Agrandir Regular, sans-serif',
        fontWeight: 500,
        fontSize: '32px',
        lineHeight: '40px',
        color: '#000000',
    },
    h3: {
        fontFamily: 'Agrandir Regular, sans-serif',
        fontWeight: 500,
        fontSize: '24px',
        lineHeight: '32px',
        color: '#000000',
    },
    h4: {
        fontFamily: 'Agrandir Regular, sans-serif',
        fontWeight: 500,
        fontSize: '21px',
        lineHeight: '28px',
        color: '#000000',
    },
};
