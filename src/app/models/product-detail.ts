export interface ProductDetail {
  id: string;
  brand: string;
  model: string;
  imgUrl: string;
  price: number;
  cpu: string;
  ram: string;
  os: string;
  displayResolution: string;
  battery: string;
  primaryCamera: string [];
  secondaryCmera: string;
  dimentions: string;
  weight: number;
  colors: string[];
  internalMemory: string[];
  options: {
    colors: SelectOption[];
    storages: SelectOption[];
  };
}

export interface SelectOption {
  code: string;
  name: string;
}
