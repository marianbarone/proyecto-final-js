import { Router } from "express";
import { shopController } from "../controllers/shop-controller";

const router = Router();

router.use(shopController.userInfo);

router.get("/", shopController.getTienda);
router.get("/cart", shopController.getCart);
// router.get("/detalle", shopController.getDetalle);
// router.get("/checkout", shopController.getCheckout);
// router.post("/checkout/newOrder", shopController.newOrder);


export default router;