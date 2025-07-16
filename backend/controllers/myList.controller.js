import myListModel from "../models/myList.model.js";
import UserModel from "../models/user.model.js";

export const addToMyListController = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      productId,
      productTitle,
      image,
      price,
      oldPrice,
      discount,
      rating,
    } = req.body;
    const item = await myListModel.findOne({
      userId,
      productId,
    });
    if (item) {
      return res.status(400).json({
        message: "Item already in my list",
      });
    }
    const myList = new myListModel({
      productId,
      productTitle,
      image,
      price,
      oldPrice,
      discount,
      rating,
      userId,
    });

    const save = await myList.save();

    return res.status(200).json({
      error: false,
      success: true,
      message: "product added in the my list",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const deleteToMyListController = async (req, res) => {
  try {
    const myListItem = await myListModel.findById(req.params.id);
    if (!myListItem) {
      return res.status(404).json({
        message: "Item not found",
        error: true,
        success: false,
      });
    }
    const deletedItem = await myListItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(400).json({
        message: "Item not deleted",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      error: false,
      success: true,
      message: "product removed succesfully from my list",
    }); 
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getMyListController = async (req, res) => {
  try {
    const userId = req.userId;
    const myListItem = await myListModel.find({
      userId: userId,
    })
    return res.status(200).json({
      data: myListItem,
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