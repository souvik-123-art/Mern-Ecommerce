import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (req, res) => {
  try {
    const {
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
      status,
      landmark,
      addressType,
      selected,
    } = req.body;
    const userId = req.userId;

    if (!address_line || !city || !state || !pincode || !country || !mobile) {
      return res.status(400).json({
        message: "please fill all the fields",
        error: true,
        success: false,
      });
    }
    const address = new AddressModel({
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
      landmark,
      addressType,
      userId,
    });
    const saveAddress = await address.save();

    const updateAddressUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          address_details: saveAddress?._id,
        },
      }
    );

    return res.status(200).json({
      data: saveAddress,
      message: "address added successfully",
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
export const getAddressController = async (req, res) => {
  try {
    const userId = req.userId;

    const allAdress = await AddressModel.find({ userId });

    if (!allAdress) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "address not found",
      });
    }
    return res.status(200).json({
      error: false,
      success: true,
      data: allAdress,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const deleteAddressController = async (req, res) => {
  try {
    const userId = req.userId;
    const addressID = req.params.id;

    const deletedAddress = await AddressModel.findOneAndDelete({
      _id: addressID,
      userId: userId,
    });

    if (!deletedAddress) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "address can not be deleted",
      });
    }
    const user = await UserModel.findOne({
      _id: userId,
    });
    const allAddress = user?.address_details;

    const updatedAllAddress = [
      ...allAddress.slice(0, allAddress.indexOf(addressID)),
      ...allAddress.slice(allAddress.indexOf(addressID) + 1),
    ];
    user.address_details = updatedAllAddress;

    await user.save();
    return res.status(200).json({
      error: false,
      success: true,
      message: "address removed succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
