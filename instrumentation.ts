import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';

import {
    PeriodicExportingMetricReader,
    ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';

import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";


const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'RollTheDice',
        [SemanticResourceAttributes.SERVICE_VERSION]: '1.0'
    }),
    traceExporter: new ConsoleSpanExporter(),
    metricReader: new PeriodicExportingMetricReader({
        exporter: new ConsoleMetricExporter(),
        exportIntervalMillis: 3000,
    }),
});


sdk.start()