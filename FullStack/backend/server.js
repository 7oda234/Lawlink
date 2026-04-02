import dotenv from 'dotenv';
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

// Import routes
// Assuming routes are exported from modules
// For example, import authRoutes from './modules/auth/auth.routes.js';
// app.use('/api/auth', authRoutes);
// Add all module routes here

const PORT = process.env.PORT || 5000; // eslint-disable-line no-undef

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
try {    await connectDB();
    console.log('✅ Database connected successfully');

    } catch (err) {
        console.error('❌ Server failed to start:', err.message);
        // لو الداتابيز مش شغالة، السيرفر مش هيقوم وده الصح
        process.exit(1);
    }
;

startServer();