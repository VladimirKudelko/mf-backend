import { io } from '../../index';
import { IoEventTypesEnum } from '../enums';

export const pushNewBalance = (balance: number) => {
  console.log(balance);
  io.emit(IoEventTypesEnum.BALANCE, balance);
};
