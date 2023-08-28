import { readdirSync } from 'fs';
import { basename as _basename } from 'path';
import Sequelize, { DataTypes } from 'sequelize';

const configJson = {
     "development": {
          "username": "root",
          "password": null,
          "database": "database_development",
          "host": "127.0.0.1",
          "dialect": "sqlite",
          "storage": "./test.db"
     },
     "test": {
          "username": "root",
          "password": null,
          "database": "database_test",
          "host": "127.0.0.1",
          "dialect": "sqlite",
          "storage": "./test.db"
     },
     "production": {
          "username": "root",
          "password": null,
          "database": "database_production",
          "host": "127.0.0.1",
          "dialect": "sqlite",
          "storage": "./test.db"
     }
};

const currentFile = new URL(import.meta.url).pathname;
const basename = _basename(currentFile);
const env = process.env.NODE_ENV || 'development';
const config = configJson[env];

let sequelize;
if (config.use_env_variable) {
     sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
     sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {
     sequelize,
     Sequelize,
     initModels: async () => {  // <-- New function to handle model initialization
          const importPromises = [];

          readdirSync(new URL('.', import.meta.url))
               .filter(file => {
                    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
               })
               .forEach(file => {
                    const modelUrl = new URL(file, import.meta.url).href;
                    const modelPromise = import(modelUrl)
                         .then(m => {
                              const model = m.default(sequelize, DataTypes);
                              db[model.name] = model;
                              return model;
                         });
                    importPromises.push(modelPromise);
               });

          await Promise.all(importPromises);

          Object.keys(db).forEach(modelName => {
               if (db[modelName].associate) {
                    db[modelName].associate(db);
               }
          });
     }
};

export default db;