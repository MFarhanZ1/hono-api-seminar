import { Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";
import { BlankEnv, BlankSchema } from "hono/types";
import GlobalHandler from "./handlers/global.handler";
import globalRoute from "./routes/global.route";
import LogMiddleware from "./middlewares/log.middleware";
import jadwalRoute from "./routes/jadwal.route";
import tahunAjaranRoute from "./routes/tahun-ajaran.route";
import ruanganRoute from "./routes/ruangan.route";

// Init Hono Object and Load environment variables from .env file
const app: Hono<BlankEnv, BlankSchema, "/"> = new Hono({
  router: new RegExpRouter(),
});
const { APP_PORT }: NodeJS.ProcessEnv = process.env;

// Load all available middlewares
app.use("*", LogMiddleware.hanzLogger);

// Load all default routes for common handling
app.notFound(GlobalHandler.notFound);
app.onError(GlobalHandler.error);

// Load all available routes
app.route("/", globalRoute);
app.route("/", jadwalRoute);
app.route("/", tahunAjaranRoute);
app.route("/", ruanganRoute);

export default {
  port: APP_PORT || 5000,
  fetch: app.fetch,
};

console.log(`[INFO] Server is on fire at port ${APP_PORT}! 🔥`);
