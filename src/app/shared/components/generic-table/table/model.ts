export interface ColumnSetting {
  primaryKey: string;
  header?: string;
  property?: string;
  isDate?: boolean;
  format?: PipeFormat
}

export interface ButtonSettings {
  title: string;
  func: any;
  class?: string[];
  params: Object;
}

export enum PipeFormat {
  DEFAULT,
  CURRENCY, 
  DATE,
  PERCENTAGE
}
