import { TransferRoutes } from '../../../utils/enums';
import EnterBusinessDetails from './BusinessDetails';
import EnterPayment from './EnterAmount';
import EnterPersonalDetails from './PersonalDetails';
import BusinessOwners from './BusinessOwners';
import TransferType from './TransferType';
import Recipient from './Recipient';
import CashPaymentMethods from './CashPaymentMethods';
import CardDetails from './CardDetails';
import Confirm from './ConfirmPayment';
import CryptoPayment from './CryptoPayment';
import CryptoPaymentMethods from './CryptoPaymentMethods';

export default {
  [TransferRoutes.ENTER_PAYMENT]: { step: 0, component: EnterPayment },
  [TransferRoutes.ENTER_PERSONAL]: {
    step: 1,
    component: EnterPersonalDetails,
  },
  [TransferRoutes.CONFIRM_BUSINESS]: { step: 1, component: BusinessOwners },
  [TransferRoutes.TRANFER_TYPE]: { step: 2, component: TransferType },
  [TransferRoutes.RECIPIENT]: { step: 2, component: Recipient },
  [TransferRoutes.ENTER_BUSINESS]: {
    step: 1,
    component: EnterBusinessDetails,
  },
  [TransferRoutes.CONFIRM_PAYMENT]: { step: 3, component: Confirm },
  [TransferRoutes.CASH_PAYMENT_METHODS]: {
    step: 4,
    component: CashPaymentMethods,
  },
  [TransferRoutes.CRYPTO_PAYMENT_METHODS]: {
    step: 4,
    component: CryptoPaymentMethods,
  },
  [TransferRoutes.CRYPTO_PAYMENT]: {
    step: 4,
    component: CryptoPayment,
  },
  [TransferRoutes.CARD_DETAILS]: { step: 4, component: CardDetails },
};
