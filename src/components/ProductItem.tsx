import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Tooltip,
  Stack,
} from "@mui/material";

export type Product = {
  title: string;
  price: number;
  description: string;
  image: string;
};

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart?: (product: Product) => void; // optional, in case you want to remove
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onRemoveFromCart,
}) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleAdd = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onAddToCart(product);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      if (onRemoveFromCart) {
        onRemoveFromCart(product);
      }
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{ height: 200, objectFit: "contain", p: 2 }}
      />
      <CardContent>
        <Box sx={{ height: 260 }}>
          <Tooltip title={product.title}>
            <Typography
              gutterBottom
              variant="h6"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: '3.2em',
              }}
            >
              {product.title}
            </Typography>
          </Tooltip>

          <Typography variant="subtitle1" color="green">
            ${product.price}
          </Typography>

          <Tooltip title={product.description}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 5,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: '3.2em',
                mb: 1,
              }}
            >
              {product.description?.toLowerCase()}
            </Typography>
          </Tooltip>
        </Box>

        {quantity === 0 ? (
          <Button data-testid="addtocart" variant="contained" fullWidth onClick={handleAdd}>
            Add to Cart
          </Button>
        ) : (
          <Stack alignItems="center" direction="row" spacing={1}>
            <Button
              data-testid="decrement"
              variant="outlined"
              color="primary"
              onClick={handleRemove}
              sx={{ minWidth: 0, width: "33%" }}
            >
              -
            </Button>
            <Box>
              <Typography variant="body1">{quantity} in cart</Typography>
            </Box>
            <Button
              data-testid="increment"
              variant="outlined"
              color="primary"
              onClick={handleAdd}
              sx={{ minWidth: 0, width: "33%" }}
            >
              +
            </Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
