import CartProductModel from "../models/cartProduct.model.js";
// import UserModel from "../models/user.model.js";

export const addToCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      productId,
      qty,
      image,
      productTitle,
      brand,
      rating,
      countInStock,
      price,
      oldPrice,
      discount,
      size,
      ram,
      weight,
      subtotal,
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "you need to login first",
        error: true,
        success: false,
      });
    }
    if (!productId) {
      return res.status(402).json({
        message: "provide productId",
        error: true,
        success: false,
      });
    }

    const checkItemCart = await CartProductModel.findOne({
      userId,
      productId,
    });
    if (checkItemCart) {
      return res.status(400).json({
        message: "item already in cart",
      });
    }
    const cartItem = new CartProductModel({
      quantity: qty || 1,
      userId: userId,
      productId: productId,
      image,
      productTitle,
      brand,
      rating,
      countInStock,
      price,
      oldPrice,
      discount,
      size,
      ram,
      weight,
      subtotal,
    });
    const save = await cartItem.save();
    // const updateAddressUser = await UserModel.updateOne(
    //   { _id: userId },
    //   {
    //     $push: {
    //       shopping_cart: productId,
    //     },
    //   }
    // );
    return res.status(200).json({
      data: save,
      message: "Item added successfully in your cart",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const cartItems = await CartProductModel.find({
      userId: userId,
    });
    return res.status(200).json({
      data: cartItems,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const updateCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;
    const { qty, subtotal } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "cart product not found",
      });
    }
    const updateCartItem = await CartProductModel.updateOne(
      {
        _id: id,
        userId: userId,
      },
      {
        quantity: qty,
        subtotal,
      }
    );
    return res.json({
      message: "cart updated",
      data: updateCartItem,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const deleteCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "provide _id",
      });
    }
    const deleteCartItem = await CartProductModel.deleteOne({
      _id: id,
      userId: userId,
    });
    if (!deleteCartItem) {
      return res.status(400).json({
        message: "cart item not deleted",
        error: true,
        success: false,
      });
    }
    // const user = await UserModel.findOne({
    //   _id: userId,
    // });
    // const cartItems = user?.shopping_cart;

    // const updatedUserCart = [
    //   ...cartItems.slice(0, cartItems.indexOf(productId)),
    //   ...cartItems.slice(cartItems.indexOf(productId) + 1),
    // ];
    // user.shopping_cart = updatedUserCart;

    // await user.save();
    return res.json({
      message: "cart item deleted",
      error: false,
      success: true,
      data: deleteCartItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
