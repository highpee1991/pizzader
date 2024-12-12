import React from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { decreaseCartQuantity, increaseCartQuantity } from './cartSlice';

const UpdateItemQuantity = ({ pizzaId, currentQuantity }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="rounded"
        onClick={() => dispatch(increaseCartQuantity(pizzaId))}
      >
        +
      </Button>
      <div className="text-sm font-semibold">{currentQuantity}</div>
      <Button
        type="rounded"
        onClick={() => dispatch(decreaseCartQuantity(pizzaId))}
      >
        -
      </Button>
    </div>
  );
};

export default UpdateItemQuantity;
