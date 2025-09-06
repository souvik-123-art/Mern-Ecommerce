import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BsCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const OrderSuccessPopup = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 1500); // Show the button after animation

      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-white rounded-lg shadow-lg p-10 text-center max-w-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <BsCheckCircleFill className="text-green-500 text-[100px] mx-auto" />
        </motion.div>

        <h2 className="text-2xl font-semibold mt-4">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order is being processed.
        </p>

        {showButton && (
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-primary text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Back to Home
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default OrderSuccessPopup;
