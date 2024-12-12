import React from 'react';
import Button from '../../ui/Button';
import { deleteCart } from './cartSlice';
import { useDispatch } from 'react-redux';

const DeleteItem = ({ pizzaId }) => {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteCart(pizzaId))}>
      Delete
    </Button>
  );
};

export default DeleteItem;
