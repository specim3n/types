export interface ISSpec {
    type: 'Boolean' | 'Checkbox' | 'Color' | 'Datetime' | 'Image' | 'Integer' | 'Number' | 'Select' | 'Spaces' | 'String' | 'Switch' | 'Video' | 'Wysiwyg';
    title: string;
    description: string;
    default?: any;
    required?: boolean;
    responsive?: boolean;
}
