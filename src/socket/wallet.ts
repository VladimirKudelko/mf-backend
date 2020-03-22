import { WalletDocument } from './../models/wallet';
import { io } from '../../index';
import { IoEventTypesEnum } from '../enums';

export const pushNewWallet = (wallet: WalletDocument) => io.emit(IoEventTypesEnum.WALLET, wallet);
