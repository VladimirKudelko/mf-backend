import * as Joi from 'joi';

export const getConversionRatesSchema = {
  query: {
    base: Joi.string().required()
  },
};

export const updateCurrencySchema = {
  body: {
    conversionResult: Joi.number().required(),
    conversionCurrency: Joi.string().required(),
  }
};
