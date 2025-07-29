import React from 'react';
import {
  getCheckoutInfo,
  formatCheckout,
  isFinishable,
} from '../utils/checkoutData';
import '../styles/GameProfessional.css';

const CheckoutHint = ({ score }) => {
  const checkoutInfo = getCheckoutInfo(score);

  if (!checkoutInfo || !isFinishable(score)) {
    return null;
  }

  const { primary, alternatives } = checkoutInfo;

  return (
    <div className="checkout-text">
      <div className="checkout-primary-text">{formatCheckout(primary)}</div>
      {alternatives.length > 0 && (
        <div className="checkout-alt-text">
          {formatCheckout(alternatives[0])}
        </div>
      )}
      {score <= 50 && (
        <div className="checkout-double-reminder">Must finish with double</div>
      )}
    </div>
  );
};

export default CheckoutHint;
