import express, { Express, Request, Response } from "express";

interface ApiResponseI {
  unix: number;
  utc: string;
}

interface errorResponseI {
  error: string;
}

const app: Express = express();

app.get("/api/:date?", (req: Request, res: Response) => {
  let date: string = req.params.date;

  if (!date) {
    date = Date.now().toString();
  }

  const isNumber: boolean = !isNaN(+date);
  if (!isNumber) {
    const isParseable: boolean = Number.isSafeInteger(Date.parse(date));
    if (!isParseable) {
      const error: errorResponseI = {
        error: "Invalid Date",
      };

      res.status(422).json(error);
    }
  }

  const dateUnixFormat: number = isNumber ? +date : Date.parse(date);
  const dateUTCFormat: string = new Date(dateUnixFormat).toUTCString();

  const response: ApiResponseI = {
    unix: dateUnixFormat,
    utc: dateUTCFormat,
  };

  res.status(200).json(response);
});

if (!module.parent) {
  app.listen(3000);
}

export default app;
