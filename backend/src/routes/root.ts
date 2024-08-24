import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import path from "path";

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

// Unauthorized
router.get("401", (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: "401 Unauthorized" });
  } else {
    next();
  }
});

// Forbidden
// router.get("403", (req: Request, res: Response, next: NextFunction) => {
//   if (!req.user.hasPermission) {
//     res.status(403).json({ message: "403 Forbidden" });
//   } else {
//     next();
//   }
// });

// Not Found
router.get("404", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "404 Not Found" });
});

// Page Expired
router.get("419", (req: Request, res: Response, next: NextFunction) => {
  if (req.session) {
    const now = Date.now();
    const expires = req.session.cookie.expires;

    if (expires && now > expires.getTime()) {
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        res.status(419).json({ message: "419 Page Expired" });
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

// Internal Server Error
router.get("500", (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "500 Internal Server Error" });
});

export default router;
