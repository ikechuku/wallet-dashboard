import { ReactNode } from 'react';

interface DDinterface {
  startIcon?: ReactNode;
  title?: string;
  dropDownWidth?: string;
  height?: string;
  showSearch?: boolean;
  searchProperty?: string;
  property?: string;
  bgcolor?: string;
  selectItem: Function;
  showLabelInDropDown?: boolean;
  top?: string;
  id?: string;
  placeholder?: string;
  makeItem?: (any: any, index: number) => {};
  params?: any;
}

export interface DropdownSelectInterface extends DDinterface {
  isOpen: boolean;
  closeSelect?: Function;
  selectedValue: string;
  list: Array<any>;
}

export interface DropdownInterface extends DDinterface {
  children?: React.SFC<{ item: any }>;
  id: string;
  showBorder?: boolean;
  disabled?: boolean;
  inputWidth: string;
  selectedItem: any;
  list: Array<any>;
}
