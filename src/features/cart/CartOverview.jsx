import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { getCartQuantity, getCartTotalPrice } from './cartSlice';

function CartOverview() {
  const totalCartQuantity = useSelector(getCartQuantity);

  const totalCartPrices = useSelector(getCartTotalPrice);

  if (!totalCartQuantity) return;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:p-6 md:text-base">
      <p className=" space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrices)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
