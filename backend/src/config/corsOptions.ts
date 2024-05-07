import "dotenv/config";

const allowedOrigins = [
  "http://localhost:5173",
  "https://music-art-generator.web.app",
  "http://localhost:3000",
];

// Enable CORS (Cross-Origin Resource Sharing)
export const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (allowedOrigins.includes(origin!)) {
      console.log("this is your origin", origin);
      callback(null, true);
    } else {
      console.log("this is your origin Error", origin);
      callback(new Error("Not allowed by CORS ha zebi"));
    }
  }, // Allow requests from this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify the HTTP methods you want to allow
  optionsSuccessStatus: 204, // Set the response status for preflight requests to 204
  credentials: true,
};
