import help from './help';
import {
  Alert,
  AsyncStorage,
} from 'react-native';
import InAppBilling from 'react-native-billing';
import {localText, errorCode} from '../i18n';

const alertErrorCode = (code) => {
  const errorText = errorCode[code];
  if (errorText && errorText.title) {
    Alert.alert(errorText.title, errorText.description);
  }
};

const debounce = (func, wait = 300, key = `${func}`, immediate = true) => {
  return help.debounce(func, wait, immediate, key);
};

const sendPurchasedAndroid = ({refillGoldCoinsAndroid, pushModal, openLoading, closeLoading}) => {
  const runFunc = () => {
    AsyncStorage.getItem('latestPurchasedProduct', async (error, productString) => {
      if (productString) {
        const productObj = JSON.parse(productString);
        const {productId, amount} = productObj;
        await InAppBilling.close();
        try {
          await InAppBilling.open();
          if (!await InAppBilling.isPurchased(productId)) {
            await InAppBilling.purchase(productId);
          }
          openLoading();
          const productDetails = await InAppBilling.getPurchaseTransactionDetails(productId);
          refillGoldCoinsAndroid({data: productDetails.receiptData, signature: productDetails.receiptSignature})
            .then(async () => {
              pushModal('ReceiveCoin', {
                receiveData: {
                  title: localText.success_redeem,
                  desciption: localText.success_redeem_reward(amount),
                  amount,
                  type: 'goldCoin',
                },
              });
              await InAppBilling.consumePurchase(productId);
              AsyncStorage.removeItem('latestPurchasedProduct', runFunc);
            })
            .catch((err) => {
              if (err.errorCode === 'invalid_android_receipt_data') {
                AsyncStorage.removeItem('latestPurchasedProduct', runFunc);
              }
              setTimeout(runFunc, 5 * 1000);
            });
        } catch (err) {
          const errCode = err.message.replace('Purchase or subscribe failed with error: ', '');
          alertErrorCode(`purchasedError_${errCode}`);
          if (errCode !== 2 && errCode !== 5 && errCode !== 6 && errCode !== 113) {
            AsyncStorage.removeItem('latestPurchasedProduct', runFunc);
          } else {
            runFunc();
          }
          closeLoading();
          await InAppBilling.consumePurchase(productId);
          await InAppBilling.close();
        }
      } else {
        closeLoading();
        await InAppBilling.close();
      }
    });
  };
  runFunc();
};

export { alertErrorCode, debounce, sendPurchasedAndroid };
