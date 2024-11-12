const config: any = {
  schemaFile: "http://localhost:27143/swagger/v1/swagger.json",
  apiFile: "./src/app/api/emptySplitApi.ts",
  apiImport: "emptySplitApi",
  outputFile: "./src/app/api/HCMSApi.ts",
  exportName: "HCMSApi",
  hooks: { queries: true, lazyQueries: true, mutations: true },

};

export default config;
