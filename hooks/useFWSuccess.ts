import React from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { UKAccountValidationResProps } from '../models/AccountDetails';
import { VerifyTransactionReqProps, TransferState } from '../models/Transfer';
import { VerifyTransactionAsync } from '../store/actions/tranferActions';

export default function useFWSuccess(params) {
  const dispatch = useDispatch();
  const transfer: TransferState = useSelector((state) => state.transfer);
  const { accountDetails } = transfer;
  const Router = useRouter();
  const [info, setInfo] = React.useState({
    tx_ref: null,
    transaction_id: null,
    status: null,
  });
  const { setPayProcess, form } = params;
  React.useEffect(() => {
    if (form.fromCountry !== 'NG') return;
    let { tx_ref, transaction_id, status } = Router.query;
    if (
      !(tx_ref && transaction_id && status === 'successful' && accountDetails)
    ) {
      const { resp } = Router.query;
      const jsonData = (window as any).decodeURI(resp);
      const {
        data: {
          data: { id, txRef, status: sts },
        },
      } = JSON.parse(jsonData);
      tx_ref = txRef;
      transaction_id = id;
      status = sts;
      setInfo({ tx_ref, transaction_id, status });
    } else {
      setInfo({ tx_ref, transaction_id, status });
    }

    const UKAcc = accountDetails as UKAccountValidationResProps;
    dispatch(
      VerifyTransactionAsync({
        cb: (pass) => {
          if (pass) setPayProcess(true);
          else setPayProcess(null);
        },
        params: {
          bankBIC: UKAcc.bankBIC,
          bankName: UKAcc.bank,
          branchBIC: UKAcc.branchBIC,
          currencyPair: `${form.fromCurrency}/${form.toCurrency}`,
          flwRef: tx_ref,
          iban: UKAcc.iban,
          narration: form.narration,
          otp: '12345',
          recipientName: form.newRecipientName,
          saveCard: form.saveCard,
          tranxRef: transaction_id,
          recipient: {
            accountNumber: form.accountNumber,
            bankName: form.bankName,
            name: form.newRecipientName,
            bankCode: form.bank,
            sortCode: form.sortCode,
            countryId: form.recipientCountryId,
            tag: form.recipientTag,
            swiftCode: UKAcc.bankBIC,
          },
        } as VerifyTransactionReqProps,
      })
    );
  }, [accountDetails]);
  return { ...info };
}
