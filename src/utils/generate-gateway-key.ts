import { randomBytes } from 'crypto';
import { runAndHandleErrors } from './cli';

const main = async () => {
  const httpGatewayKey = randomBytes(32).toString('hex');
  const signedHttpGatewayKey = randomBytes(32).toString('hex');

  console.log(`🔑 Generated HTTP Gateway API Key: ${httpGatewayKey}`);
  console.log(`🔑 Generated HTTP Signed Data Gateway API Key: ${signedHttpGatewayKey}`);
};

if (require.main === module) runAndHandleErrors(main);

export { main as generateGatewayKey };
