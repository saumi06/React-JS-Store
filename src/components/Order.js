import React from 'react';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }
  renderOrder(key) {
    const item = this.props.foods[key];
    const count = this.props.order[key];
    const isAvailable = item && item.status === "available";

    const removeButton = <button
      onClick={() => this.props.removeFromOrder(key)}>&times;</button>
    const transitionOptions = {
      className: "order",
      key,
      timeout: { enter: 5000, exit: 5000 }
    };
    if (!item) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry, {item ? item.name : "item"} is no longer available
          </li>
        </CSSTransition>
      )
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            {item.name} x{count}
          </span>
          <span className="price">{formatPrice(count * item.price)} {removeButton}</span>
        </li>
      </CSSTransition>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const item = this.props.foods[key];
      const count = this.props.order[key];
      const isAvailable = item && item.status === 'available';
      if (isAvailable) {
        return prevTotal + (count * item.price || 0)
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <TransitionGroup className="order"
          component="ul"
        >

          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>


      </div>
    )
  }
}
Order.propTypes = {
  foods: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  removeFromOrder: PropTypes.func.isRequired
}
export default Order;