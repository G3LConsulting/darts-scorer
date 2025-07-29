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

  const { dartsRequired, primary, alternatives } = checkoutInfo;

  return (
    <div className="checkout-hint">
      <div className="checkout-hint-header">
        <span className="checkout-hint-title">CHECKOUT</span>
        <span className="checkout-hint-darts">
          {dartsRequired} dart{dartsRequired > 1 ? 's' : ''}
        </span>
      </div>

      <div className="checkout-combinations">
        <div className="checkout-primary">
          <span className="checkout-label">Primary:</span>
          <span className="checkout-combo">{formatCheckout(primary)}</span>
        </div>

        {alternatives.length > 0 && (
          <div className="checkout-alternatives">
            {alternatives.map((alt, index) => (
              <div key={index} className="checkout-alternative">
                <span className="checkout-label">Alt {index + 1}:</span>
                <span className="checkout-combo">{formatCheckout(alt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {score <= 50 && (
        <div className="checkout-note">
          <span className="checkout-note-icon">💡</span>
          <span className="checkout-note-text">Must finish with a double!</span>
        </div>
      )}
    </div>
  );
};

export default CheckoutHint;
