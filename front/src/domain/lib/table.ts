import { toCamelCase } from '@app/core/helpers/converters';

export class tableColumn {
    field: string;
    headerName: string;
    minWidth: number;

    constructor(field: string, headerName: string, minWidth: number) {
        this.field = toCamelCase(field);
        this.headerName = headerName;
        this.minWidth = minWidth;
    }
}
