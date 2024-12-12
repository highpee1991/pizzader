import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className="mt-7 px-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="py-3 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
