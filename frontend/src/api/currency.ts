import { Currency } from './../models/Currency';
import { axios, Response } from 'utils/axios';

export const apiCurrency = {
  getAll: () => axios.get<Response<Currency[]>>('/currencies'),
};
