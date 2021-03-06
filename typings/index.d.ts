// Define types that will be used by web-walk consumers

/**
 * Exposed APIs
 */
declare module 'web-walk' {
  const walk: (config: WebWalkConfig) => Promise<any>;
}

/**
 * Represents header/cookie/formData
 */
interface StringPairs {
  [key: string]: string
}

/**
 * Cookie properties
 */
interface CookieProps {
  key: string;
  value: string;
  expires: Date | 'Infinity' | '-Infinity';
  maxAge: number | 'Infinity' | '-Infinity';
  domain: string;
  path: string;
  secure: boolean;
  httpOnly: boolean;
}

/**
 * Web walk step input
 */
interface WebWalkRequest extends RequestInit {
  url?: string;
  // Properties defined for convinence
  cookies?: StringPairs;
  formData?: StringPairs;
}

/**
 * Web walk step output
 */
interface WebWalkResponse {
  status: number;
  cookies: StringPairs;
  rawCookies: CookieProps[];
  headers: StringPairs;
  text: string;
  output?: any;
}

/**
 * Web walk step configuration
 */
interface WebWalkStepConfig {
  url: string;
  request?: WebWalkRequest;
  response?: WebWalkResponse;
  prepare?(lastStepResponse: WebWalkResponse, stepResponses: WebWalkResponse[]): Promise<WebWalkRequest>;
  process?(stepResponse: WebWalkResponse, stepResponses: WebWalkResponse[]): Promise<any>;
}

/**
 * Web walk session configuration
 */
interface WebWalkConfig {
  headers?: StringPairs;
  cookies?: StringPairs;
  steps: WebWalkStepConfig[];
}
