import React from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchDataFromApi, postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { setProReview } from "../../redux/Slices/productsDataSlice";
const Reviews = (props) => {
  const userDetails = useSelector((state) => state.UserDetails.userDetails);
  const proReview = useSelector((state) => state.proData.proReview);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState({
    image: "",
    userName: "",
    rating: 1,
    review: "",
    userId: "",
    productId: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setReview((fields) => {
      return {
        ...fields,
        [name]: value,
      };
    });
  };
  const onChangeRating = (e) => {
    setReview((fields) => ({
      ...fields,
      rating: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      review.userId === "" ||
      review.userId === undefined ||
      review.userId === null
    ) {
      toast.error("please login first");
      setIsLoading(false);
      return false;
    }
    if (review.review === "") {
      toast.error("please write your review before submit");
      setIsLoading(false);
      return false;
    }

    postData("/api/user/addReview", review, { credentials: true }).then(
      (res) => {
        try {
          if (!res?.error) {
            setIsLoading(false);
            setReview((prev) => ({
              ...prev,
              review: "",
              rating: "",
            }));
            fetchDataFromApi(`/api/user/getReviews/${props?.productId}`).then(
              (response) => {
                dispatch(setProReview(response?.data));
              }
            );
            toast.success(res?.message);
          } else {
            setIsLoading(false);
            toast.error(res?.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    );
  };

  useEffect(() => {
    setReview((prev) => ({
      ...prev,
      image: userDetails?.avatar,
      userName: userDetails?.name,
      userId: userDetails?._id,
      productId: props?.productId,
    }));
  }, [userDetails, props]);
  return (
    <div className="shadow-md w-full py-5 px-4 md:px-8 rounded-md bg-white text-gray-900">
      {/* Review Form */}
      <div className="reviewForm mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Add a Review</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Write your review"
            name="review"
            value={review.review}
            onChange={onChangeInput}
            multiline
            rows={5}
            variant="outlined"
            className="w-full md:w-2/3 mb-4 !font-['lexend']"
          />

          <Rating
            defaultValue={1}
            precision={0.5}
            onChange={onChangeRating}
            size="medium"
            className="mb-4"
          />

          <Button
            type="submit"
            className="!px-4 !py-2 !bg-primary !text-white !self-start !transition hover:!bg-gray-900"
          >
            {isLoading ? (
              <CircularProgress color="white" size={22} />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>

      {/* Customer Reviews */}
      <div className="w-full proReviewContainer">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          Customer Reviews
        </h2>

        <div className="scroll w-full max-h-[300px] overflow-y-auto overflow-x-hidden space-y-4">
          {proReview?.length > 0 ? (
            [...proReview].reverse().map((review) => (
              <div key={review._id} className="review w-full">
                <article className="border border-gray-200 p-4 rounded-md bg-gray-50">
                  <div className="flex items-center mb-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover me-3"
                      src={review?.image}
                      alt={review?.userName}
                    />
                    <div className="font-medium text-gray-800">
                      <p>{review?.userName}</p>
                    </div>
                  </div>

                  <div className="mb-3 text-sm text-gray-600">
                    <time dateTime={review.createdAt}>
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>

                    <div className="mt-1">
                      <Rating
                        name="read-only"
                        value={Number(review?.rating)}
                        readOnly
                        precision={0.5}
                        size="small"
                      />
                    </div>
                  </div>

                  <p className="text-gray-800">{review?.review}</p>
                </article>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No Reviews Yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
