import cors from "cors";
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import { cpus } from "os";
import { pid } from "process";
import { APIController } from "./controllers";
import { Next, Request, Response } from './utils';

export class Server {
  private readonly PORT = 5000 || process.env.PORT;
  private readonly workers = cpus().length;
  private app = express();

  constructor() {
    /**
     * INFO:
     * Can be enable in Production
     * But for development
     * I think it is not required for now!!
     */
    // if (isMaster) {
    //   console.log(`## 🔼 Master Server: ${pid} has been started...`);
    //   for (let i = 0; i < this.workers; i++) fork();
    //   on("exit", () => fork());
    // } else {
    //   this.internalServerStart();
    // }
    this.internalServerStart();
  }

  private async serverConfig() {
    // express-file-upload setup middleware
    this.app.use(json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(urlencoded({ extended: false }));
  }

  private errorHandlers(): void {
     this.app.use(
      async (req: RequestInterface, res: ResponseInterface, next: Next) => {
        next(createError(404, "Not Found!"));
      }
    );
    this.app.use(
      (err: any, req: RequestInterface, res: ResponseInterface, next: Next) => {
        res.status(err.status || 500).send({
          error: {
            status: err.status || 500,
            message: err.message,
          },
        });
      }
  }

  private async internalServerStart() {
    try {
      await this.serverConfig();
      this.app.use("/api", APIController);

      this.app.listen(this.PORT, () =>
          console.log(
              `[ PID:${pid} ] 🚀 Server already started on http://localhost:${this.PORT}`
          )
      );

	this.errorHandlers();
    } catch (error) {
      console.error({ error });
    }
  }
}
