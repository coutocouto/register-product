import { Sequelize } from 'sequelize-typescript';
import { Product } from '../products/entity/product.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'register-product-db',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'register-product-db',
      });
      sequelize.addModels([Product]);
      setTimeout(async () => {
        await sequelize.sync();
      }, 10000);
      return sequelize;
    },
  },
];
