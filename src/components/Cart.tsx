import React from "react";
import { Drawer, List, Typography, Divider, Box } from "@mui/material";
import CartItem from "./CartItem";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import "./Cart.css"

interface CartItemData {
  title: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItemData[];
  open: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ open, onClose, items }) => {
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box className="cart-width">
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Cart
          </Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        {items.length === 0 ? (
          <Typography variant="body1">Cart is empty</Typography>
        ) : (
          <>
            <List>
              {items.map((item, idx) => (
                <CartItem
                  key={idx}
                  title={item.title}
                  price={item.price}
                  quantity={item.quantity}
                />
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Cart;
