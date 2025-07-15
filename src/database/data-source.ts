// src/database/data-source.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// Load environment variables
config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'Anihortes1',
  database: process.env.DB_DATABASE || 'collab_vortex',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
  logging: false,
});

export default dataSource;