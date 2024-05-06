import "dotenv/config";

// Enable CORS (Cross-Origin Resource Sharing)
export const corsOptions = {
  origin: function (
    origin: string | undefined = process.env.FRONTEND_URL,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS! LOL!"));
    }
  }, // Allow requests from this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify the HTTP methods you want to allow
  optionsSuccessStatus: 204, // Set the response status for preflight requests to 204
  credentials: true,
};
