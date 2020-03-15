import * as request from 'request-promise';

import { Controller } from '../types';
import { Response } from '../models';
import { walletHelper, authHelper } from '../db/helpers';

export const getConversionRates: Controller = async(req, res) => {
  const { query: { base } } = req;
  const apiResponse = await request({
    method: 'GET',
    uri: `https://prime.exchangerate-api.com/v5/ee20b6ab256a6d3b54d3e326/latest/${base}`,
    json: true
  });
  const conversionRates = (apiResponse && apiResponse.conversion_rates) || {};

  res.json(new Response({ conversionRates }));
};

export const updateCurrency: Controller = async(req, res) => {
  const { body: { conversionResult, conversionCurrency } } = req;
  const { _id: userId } = req.user as any;
  const updatedWallet = await walletHelper.updateByUserId(
    userId,
    { balance: conversionResult, currency: conversionCurrency }
  );
  const updatedUser = await authHelper.updateById(userId, { currency: conversionCurrency });

  res.json(new Response({
    isUpdated: (
      updatedWallet.currency === conversionCurrency &&
      updatedUser.currency === conversionCurrency
    )
  }));
};
