import React, { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ProductItem from "../components/ProductItem";
import Cart from "../components/Cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

interface Product {
  title: string;
  price: number;
  description: string;
  image: string;
}

interface CartItem {
  title: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [openCart, setOpenCart] = useState(false);

  const handleCartClick = () => {
    setOpenCart(true);
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  const removeFromCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev[product.title];
      if (!existing) return prev;

      const newQty = existing.quantity - 1;
      if (newQty <= 0) {
        const { [product.title]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [product.title]: {
          ...existing,
          quantity: newQty,
        },
      };
    });
  };

  useEffect(() => {
    fetch(
      "https://equalexperts.github.io/frontend-take-home-test-data/products.json"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev[product.title];
      const quantity = existing ? existing.quantity + 1 : 1;
      return {
        ...prev,
        [product.title]: { ...product, quantity },
      };
    });
  };

  const totalQuantity = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <Container sx={{ pt: 8 }}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bgcolor: "background.paper",
            boxShadow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 64,
            paddingLeft: 10,
            paddingRight: 10,
            zIndex: (theme) => theme.zIndex.appBar,
          }}
        >
          <Typography variant="h4" component="h4">
            Product
          </Typography>

          <Badge
            badgeContent={totalQuantity > 0 ? `+${totalQuantity}` : null}
            color="error"
          >
            <IconButton
              onClick={handleCartClick}
              color="inherit"
              data-testid="cart-icon"
            >
              <ShoppingCartIcon sx={{ fontSize: 30, color: "primary.main" }} />
            </IconButton>
          </Badge>
        </Box>

        {/* Products Grid */}
          <Grid container spacing={2}>
            {products.map((product, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={index}
                data-testid="product-card"
              >
                <ProductItem
                  product={product}
                  onAddToCart={addToCart}
                  onRemoveFromCart={removeFromCart}
                />
              </Grid>
            ))}
          </Grid>

        {/* Cart Section */}
        {openCart && (
          <Cart
            items={Object.values(cart)}
            open={openCart}
            onClose={handleCloseCart}
          />
        )}
      </Container>
    </>
  );
};

export default ProductList;
