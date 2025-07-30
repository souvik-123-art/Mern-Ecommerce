import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (req, res) => {
  try {
    const { address_line, city, state, pincode, country, mobile, status } =
      req.body;
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
      status,
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
