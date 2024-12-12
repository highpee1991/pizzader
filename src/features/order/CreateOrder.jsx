import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCartItem, getCartTotalPrice } from '../cart/cartSlice';
import userSlice, { fetchAddress, getUserName } from '../user/userSlice';
import { useState } from 'react';
import store from '../../store';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigate = useNavigation();
  const formError = useActionData();
  const dispatch = useDispatch();
  const cart = useSelector(getCartItem);
  const username = useSelector(getUserName);
  const totalCartPrice = useSelector(getCartTotalPrice);

  const isSubmitting = navigate.state === 'submitting';

  const {
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);

  const isUserLoading = addressStatus === 'loading';

  const priority = withPriority ? totalCartPrice * 0.2 : totalCartPrice;
  const displayCartTotal = Math.round(totalCartPrice + priority);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="flex-grow">
            <input
              type="text"
              name="customer"
              required
              className="input w-full"
              defaultValue={username}
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="flex-grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="flex-grow">
            <input
              type="text"
              className="input w-full"
              name="address"
              defaultValue={(position, address)}
              disabled={isUserLoading}
              required
            />
          </div>

          {addressStatus === 'error' && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              there was a problem getting your address, Make sure to fill this
              filled
            </p>
          )}

          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[35px] z-50 sm:right-[4.5px] sm:top-[3px] md:top-[5px]">
              <Button
                disabled={isUserLoading}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  return dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting || isUserLoading}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now ${formatCurrency(displayCartTotal)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) => {
  const formOrder = await request.formData();
  const data = Object.fromEntries(formOrder);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      'Kindly write your correct phone number we might need this to contact you';

  if (Object.keys(errors).length > 0) return errors;

  // if every thing if fine place order
  const newOrder = await createOrder(order);

  // this method should not be over used
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
