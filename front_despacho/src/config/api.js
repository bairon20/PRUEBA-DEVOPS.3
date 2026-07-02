const FALLBACK_API_BASE_URL =
  "http://proyecto-semestral-alb-246801234.us-west-2.elb.amazonaws.com";

export const API_VENTAS_URL =
  import.meta.env.VITE_API_VENTAS_URL || FALLBACK_API_BASE_URL;

export const API_DESPACHOS_URL =
  import.meta.env.VITE_API_DESPACHOS_URL || FALLBACK_API_BASE_URL;
