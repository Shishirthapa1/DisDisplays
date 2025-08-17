// src/types/express/index.d.ts
import { UserDocument } from "../../models/user.model"; // adjust the path if needed

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
