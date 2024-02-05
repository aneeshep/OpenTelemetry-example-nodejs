/*dice.ts*/

import { trace, Span, metrics } from "@opentelemetry/api";

const tracer = trace.getTracer("dice-lib", "0.0.1")
const meter = metrics.getMeter("dice-lib", '0.0.1')


function rollOnce(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function rollTheDice(rolls: number, min: number, max: number) {
    const histogram = meter.createHistogram('task.duration');
    const startTime = new Date().getTime();


    //Create Span. A span must be closed
    return tracer.startActiveSpan('rollTheDice', (span: Span) => {
        const result: number[] = [];
        for (let i = 0; i < rolls; i++) {
            result.push(rollOnce(min, max));
        }
        // Be Sure to end the Span
        span.end()

        const endTime = new Date().getTime();
        const executionTime = endTime - startTime;

        histogram.record(executionTime);


        return result;
    })
}