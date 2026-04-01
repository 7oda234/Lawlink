import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// Import routes
// Automatically register all /modules/*/*.routes.js files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modulesDir = path.join(__dirname, 'modules');

const registerRoutes = async () => {
  const moduleItems = fs.readdirSync(modulesDir, { withFileTypes: true }).filter((dirent) => dirent.isDirectory());

  for (const moduleDir of moduleItems) {
    const routesFile = path.join(modulesDir, moduleDir.name, `${moduleDir.name}.routes.js`);
    if (fs.existsSync(routesFile)) {
      try {
        const mod = await import(pathToFileURL(routesFile).href);
        if (mod.default) {
          const routePath = `/api/${moduleDir.name}`;
          app.use(routePath, mod.default);
          console.log(`Loaded router ${routePath} from ${routesFile}`);
        }
      } catch (err) {
        console.error(`Failed to load router: ${routesFile}`);
        console.error(err);
      }
    }
  }
};

const init = async () => {
  await registerRoutes();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

init();
