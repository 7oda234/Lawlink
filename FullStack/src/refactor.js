import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// These lines are needed to replace __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname); // If script is inside /src
// ... rest of the code remains the same

// 1. Define the new OOP folder structure
const folders = [
    'components', 
    'pages', 
    'controllers', 
    'services', 
    'models', 
    'middleware', 
    'db', 
    'styles', 
    'tests'
];

// 2. Define where existing files should move to
const fileMoves = [
    { from: 'app.controller.js', to: 'controllers/AppController.js' },
    { from: 'Service.js', to: 'services/DataService.js' },
    { from: 'LandingPage.jsx', to: 'pages/LandingPage.jsx' },
    { from: 'LoginPage.jsx', to: 'pages/LoginPage.jsx' },
    { from: 'App.css', to: 'styles/App.css' },
    { from: 'index.css', to: 'styles/index.css' },
    { from: 'App.test.js', to: 'tests/App.test.js' },
    { from: 'setupTests.js', to: 'tests/setupTests.js' },
    { from: 'reportWebVitals.js', to: 'services/reportWebVitals.js' },
];

function setupProject() {
    console.log("🚀 Starting OOP Refactor...");

    // Create Folders
    folders.forEach(folder => {
        const dir = path.join(baseDir, folder);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`📁 Created folder: ${folder}`);
        }
    });

    // Move Files
    fileMoves.forEach(move => {
        const oldPath = path.join(baseDir, move.from);
        const newPath = path.join(baseDir, move.to);

        if (fs.existsSync(oldPath)) {
            fs.renameSync(oldPath, newPath);
            console.log(`🚚 Moved: ${move.from} -> ${move.to}`);
        }
    });

    // Handle the "Componants" folder typo if it exists
    const typoDir = path.join(baseDir, 'Componants');
    const correctDir = path.join(baseDir, 'components');
    if (fs.existsSync(typoDir)) {
        const files = fs.readdirSync(typoDir);
        files.forEach(file => {
            fs.renameSync(path.join(typoDir, file), path.join(correctDir, file));
        });
        fs.rmdirSync(typoDir);
        console.log(`🔧 Fixed typo: Moved contents of 'Componants' to 'components'`);
    }

    // Create a sample Model class for OOP demonstration
    const userModelPath = path.join(baseDir, 'models', 'User.js');
    if (!fs.existsSync(userModelPath)) {
        const userClass = `export class User {\n  constructor(id, name) {\n    this.id = id;\n    this.name = name;\n  }\n\n  display() {\n    return \`User: \${this.name}\`;\n  }\n}`;
        fs.writeFileSync(userModelPath, userClass);
        console.log(`📄 Created Model: models/User.js`);
    }

    console.log("\n✅ Refactor Complete! Your project is now organized by OOP principles.");
}

setupProject();