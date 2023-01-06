const { parseRealtorEstates } = require('./modules/realtor.ca/estatesParser');

(async () => {
  await parseRealtorEstates();
})();

