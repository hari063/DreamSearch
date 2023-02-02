const mongoose = require('mongoose');

// importing schemas to create model
const importedfaqSchema = require('../schemas/faqschema');
const importedpageSchema = require('../schemas/pageschema');
const importedcountrySchema = require('../schemas/countryschema');
const importedcategorySchema = require('../schemas/categoryschema');
const importednewsletterSchema = require('../schemas/newsletterschema');
const importedpaymentSchema = require('../schemas/paymentschema');
const importedcurrencySchema = require('../schemas/currencyschema');
const importedlanguageSchema = require('../schemas/languageschema');
const importedskillSchema = require('../schemas/skillschema');
const importedjobSchema = require('../schemas/jobschema');
const importedcompanySchema = require('../schemas/companyschema');
const importedconfigurationSchema=require('../schemas/configschema');
const importedconfigoptionSchema=require('../schemas/configoptionschema');
const importeduserSchema=require('../schemas/userschema');
const importedcandidateSchema = require('../schemas/candidateschema');
const importedemployeeSchema = require('../schemas/employeeschema');
const importedadminSchema = require('../schemas/adminschema');
const importedregisterSchema=require('../schemas/registerschema')

 
// Creating schema
const FaqSchema = mongoose.Schema(importedfaqSchema, { timestamps: true, versionKey: false });
const PageSchema = mongoose.Schema(importedpageSchema, { timestamps: true, versionKey: false });
const CountrySchema = mongoose.Schema(importedcountrySchema, { timestamps: true, versionKey: false });
const CategorySchema = mongoose.Schema(importedcategorySchema, { timestamps: true, versionKey: false });
const NewsletterSchema = mongoose.Schema(importednewsletterSchema, { timestamps: true, versionKey: false });
const PaymentSchema = mongoose.Schema(importedpaymentSchema, { timestamps: true, versionKey: false });
const CurrencySchema = mongoose.Schema(importedcurrencySchema, { timestamps: true, versionKey: false });
const LanguageSchema = mongoose.Schema(importedlanguageSchema, { timestamps: true, versionKey: false });
const SkillSchema = mongoose.Schema(importedskillSchema, { timestamps: true, versionKey: false });
const JobSchema = mongoose.Schema(importedjobSchema, { timestamps: true, versionKey: false });
const CompanySchema = mongoose.Schema(importedcompanySchema, { timestamps: true, versionKey: false });
const ConfigurationSchema=mongoose.Schema(importedconfigurationSchema,{timestamps: true, versionKey: false});
const ConfigoptionSchema=mongoose.Schema(importedconfigoptionSchema,{timestamps: true, versionKey: false});
const UserSchema=mongoose.Schema(importeduserSchema,{timestamps: true, versionKey: false});
const CandidateSchema = mongoose.Schema(importedcandidateSchema, { timestamps: true, versionKey: false });
const EmployeeSchema = mongoose.Schema(importedemployeeSchema, { timestamps: true, versionKey: false });
const AdminSchema = mongoose.Schema(importedadminSchema, { timestamps: true, versionKey: false });
const RegisterSchema=mongoose.Schema(importedregisterSchema,{timestamps: true, versionKey: false});

// Creating models
const FaqModel = mongoose.model('faqs', FaqSchema);
const PageModel = mongoose.model('pages', PageSchema);
const CountryModel = mongoose.model('countries', CountrySchema);
const CategoryModel = mongoose.model('categories', CategorySchema);
const NewsletterModel = mongoose.model('newsletters', NewsletterSchema);
const PaymentModel = mongoose.model('payments', PaymentSchema);
const CurrencyModel = mongoose.model('currencies', CurrencySchema);
const LanguageModel = mongoose.model('languages', LanguageSchema);
const SkillModel = mongoose.model('skills', SkillSchema);
const JobModel = mongoose.model('jobs', JobSchema);
const CompanyModel = mongoose.model('companies', CompanySchema);
const ConfigurationModel=mongoose.model('configs',ConfigurationSchema);
const ConfigoptionModel=mongoose.model('configopts',ConfigoptionSchema);
const UserModel=mongoose.model('users',UserSchema);
const CandidateModel = mongoose.model('candidates', CandidateSchema);
const EmployeeModel = mongoose.model('empolyees', EmployeeSchema);
const AdminModel = mongoose.model('admins', AdminSchema);
const RegisterModel=mongoose.model('registers',RegisterSchema);

module.exports = {
  faqs: FaqModel,
  pages: PageModel,
  countries:CountryModel,
  categories:CategoryModel,
  newsletters:NewsletterModel,
  payments:PaymentModel,
  currencies: CurrencyModel,
  languages: LanguageModel,
  skills: SkillModel,
  jobs: JobModel,
  companies: CompanyModel,
  configs:ConfigurationModel,
  configopts:ConfigoptionModel,
  users:UserModel,
  candidates:CandidateModel,
  employees:EmployeeModel,
  admins:AdminModel,
  registers:RegisterModel,
}
