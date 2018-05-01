import path from 'path';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs';

// import versionHealthcheck from 'version-healthcheck';
// import expressHealthcheck from 'express-healthcheck';

import templateController from './controllers/template.controller';

/* Initialize router */
const router = express.Router();

/* Swagger Doc */
const templateSwagger = yamljs.load(
  path.join(__dirname, 'swagger/template.yml'),
);
router.use('/swagger', express.static(path.join(__dirname, 'swagger')));
router.use('/docs', swaggerUi.serve, swaggerUi.setup(templateSwagger));

/* Monitoring and Healthchecks */
// router.use('/up', expressHealthcheck());
// router.get('/version', versionHealthcheck);

/* APIs */
router.get('/template', templateController);

export default router;
