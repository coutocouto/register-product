import { Product } from './entity/product.entity';

export const productsProviders = [
  {
    provide: 'PRODUCTS_REPOSITORY',
    useValue: Product,
  },
];
