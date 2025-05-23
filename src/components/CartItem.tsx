import React from 'react';
import { ListItem, Typography, Box, Divider } from '@mui/material';

interface CartItemProps {
  title: string;
  price: number;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ title, price, quantity }) => (
  <>
    <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="body2">Quantity: {quantity}</Typography>
      </Box>
      <Typography>${(price * quantity).toFixed(2)}</Typography>
    </ListItem>
    <Divider />
  </>
);

export default CartItem;
