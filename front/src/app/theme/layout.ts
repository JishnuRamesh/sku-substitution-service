const containerMaxWidth = 1144;
const containerPaddingHorizontal = 32;
const filterWidth = 272;
const filterReducedWidth = 32;

const containerWithFilterPadding = filterWidth + containerPaddingHorizontal;
const containerWithFilterBreakpoint = containerMaxWidth + containerWithFilterPadding * 2;

const containerWithReducedFilterPadding = filterReducedWidth + containerPaddingHorizontal;
const containerWithReducedFilterBreakpoint =
    containerMaxWidth + containerWithReducedFilterPadding * 2;

export const layout = {
    container: {
        maxWidth: containerMaxWidth,
        padding: {
            horizontal: containerPaddingHorizontal,
        },
        withFilter: {
            padding: containerWithFilterPadding,
            breakpoint: containerWithFilterBreakpoint,
        },
        withReducedFilter: {
            padding: containerWithReducedFilterPadding,
            breakpoint: containerWithReducedFilterBreakpoint,
        },
    },
    filter: {
        width: filterWidth,
        reducedWidth: filterReducedWidth,
    },
};
