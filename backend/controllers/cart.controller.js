import CartProductModel from "../models/cartProduct.model.js";
import UserModel from "../models/user.model.js";

export const addToCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
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
      quantity: 1,
      userId: userId,
      productId: productId,
    });
    const save = await cartItem.save();
    const updateAddressUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );
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
    const cartItem = await CartProductModel.find({
      userId: userId,
    }).populate("productId");
    return res.status(200).json({
      data: cartItem,
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
    const { _id, qty } = req.body;
    if (!_id || !qty) {
      return res.status(400).json({
        message: "provide _id, qty",
      });
    }
    const updateCartItem = await CartProductModel.updateOne(
      {
        _id: _id,
        userId: userId,
      },
      {
        quantity: qty,
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
    const { _id, productId } = req.body;
    if (!_id) {
      return res.status(400).json({
        message: "provide _id",
      });
    }
    const deleteCartItem = await CartProductModel.deleteOne({
      _id: _id,
      userId: userId,
    });
    if (!deleteCartItem) {
      return res.status(400).json({
        message: "cart item not deleted",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({
      _id: userId
    })
    const cartItems = user?.shopping_cart

    const updatedUserCart = [...cartItems.slice(0, cartItems.indexOf(productId)), ...cartItems.slice(cartItems.indexOf(productId) + 1)]
    user.shopping_cart = updatedUserCart

    await user.save()
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
