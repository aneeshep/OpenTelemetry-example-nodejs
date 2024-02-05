/*app.ts*/
import { trace, metrics } from '@opentelemetry/api';
import opentelemetry from '@opentelemetry/api';
import express, { Request, Express } from 'express';
import { rollTheDice } from './dice';

const tracer = trace.getTracer("dice-server", '0.1.0')
const meter = metrics.getMeter("dice-server", '0.1.0')


const PORT: number = parseInt(process.env.PORT || '8080');
const app: Express = express();

app.get('/rolldice', (req, res) => {
    const rolls = req.query.rolls ? parseInt(req.query.rolls.toString()) : NaN;
    if (isNaN(rolls)) {
        res
            .status(400)
            .send("Request parameter 'rolls' is missing or not a number.");
        return;
    }
    const counter = meter.createCounter('requests.count');
    counter.add(1, { 'some.optional.attribute': 'some value' })
    res.send(JSON.stringify(rollTheDice(rolls, 1, 6)));
});

app.listen(PORT, () => {
    console.log(`Listening for requests on http://localhost:${PORT}`);
});
