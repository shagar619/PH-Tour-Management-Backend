import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { createBookingZodSchema, updateBookingStatusZodSchema } from "./booking.validation";
import { validateRequest } from "../../middlewares/validateRequest";


const router = Router();

// api/v1/booking
router.post("/",
     checkAuth(...Object.values(Role)),
     validateRequest(createBookingZodSchema),
);

// api/v1/booking
router.get("/",
     checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
);

// api/v1/booking/my-bookings
router.get("/my-bookings",
     checkAuth(...Object.values(Role)),
);

// api/v1/booking/bookingId
router.get("/:bookingId",
     checkAuth(...Object.values(Role)),
);

// api/v1/booking/bookingId/status
router.patch("/:bookingId/status",
     checkAuth(...Object.values(Role)),
     validateRequest(updateBookingStatusZodSchema),
);


export const BookingRoutes = router;