const BaseUrl = '/api/v1/';
module.exports = function(app) {
  app.use(BaseUrl+"faqs", require("../controllers/admin/faq"));
  app.use(BaseUrl+"pages", require("../controllers/admin/pages"));
  app.use(BaseUrl+"countries", require("../controllers/admin/country"));
  app.use(BaseUrl+"categories",require("../controllers/admin/category"));
  app.use(BaseUrl+"newsletters", require("../controllers/admin/newsletter"));
  app.use(BaseUrl+"payments",require("../controllers/admin/payment"));
  app.use(BaseUrl+"currencies", require("../controllers/admin/currency"));
  app.use(BaseUrl+"languages", require("../controllers/admin/language"));
  app.use(BaseUrl+"skills", require("../controllers/admin/skill"));
  app.use(BaseUrl+"jobs", require("../controllers/admin/job"));
  app.use(BaseUrl+"companies", require("../controllers/admin/company"));
  app.use(BaseUrl+"configs",require("../controllers/admin/configuration"));
  app.use(BaseUrl+"configopts",require("../controllers/admin/configoption"));
  app.use(BaseUrl+"users",require("../controllers/admin/user"));
  app.use(BaseUrl+"candidates",require("../controllers/admin/candidate"));
  app.use(BaseUrl+"employees",require("../controllers/admin/employee"));
  app.use(BaseUrl+"admins",require("../controllers/admin/auth"));
  app.use(BaseUrl+"registers",require("../controllers/admin/site/register"));
app.use(BaseUrl+"registers",require("../controllers/admin/site/login"));
}
