// If using dotenv for environment variables
import 'dotenv/config'; 

// Since you are ALREADY in the src folder, use "./" 
// instead of "./src/" to avoid the "src/src" error
import { bootstrap } from "./app.controller.js";

const app = bootstrap();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));a