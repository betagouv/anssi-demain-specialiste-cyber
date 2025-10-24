import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import * as Sentry from '@sentry/node';

const config = adaptateurEnvironnement.sentry();

if (config.dsn() && config.environnement()) {
  Sentry.init({
    debug: true,
    dsn: config.dsn(),
    environment: config.environnement(),
    integrations: [Sentry.expressIntegration(), Sentry.postgresIntegration()],
    tracesSampleRate: 0.2,
    profilesSampleRate: 0.2,
    enableLogs: true,
  });
  Sentry.setTag('dsc-source', 'backend');
}
