const development = "development";

const production = "production";

const env = process.env.NODE_ENV || development;

let config = {
  appName: "fullPager",
};

switch (env) {
  case development:
    config = {
      domainPrefix: "dev",
      ...config,
      apiUrl: "http://localhost:7001/api/v1",
    };
    break;

  case production:
    config = { domainPrefix: "prod", ...config, apiUrl: "https://desolate-plains-28889.herokuapp.com/" };
    break;
  default:
    break;
}

export default Object.freeze(config);
