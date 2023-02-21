import express, { Express, Request, Response } from "express";

interface ApiResponse {
  unix: number;
  utc: string;
}

const app: Express = express();

app.get("/api/:date?", (req: Request, res: Response) => {
  const date: string = req.params.date;

  const isParseable: boolean = Number.isSafeInteger(Date.parse(date));

  if (!date || !isParseable) {
    res.sendStatus(422);
  }

  const dateUnixFormat: number = Date.parse(date);
  const dateUTCFormat: string = new Date(dateUnixFormat).toUTCString();

  const response: ApiResponse = {
    unix: dateUnixFormat,
    utc: dateUTCFormat,
  };

  res.status(200).json(response);
});

if (!module.parent) {
  app.listen(3000);
}

export default app;
