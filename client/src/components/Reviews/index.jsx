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
    <div className="shadow-md w-full py-5 px-8 rounded-md bg-white text-gray-900">
      <div className="reviewForm">
        <h2 className="text-lg font-semibold mb-3">Add a Review</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="write your review"
            name="review"
            value={review.review}
            onChange={onChangeInput}
            multiline
            className="w-1/2 !mb-4 !font-['lexend']"
            rows={5}
            variant="outlined"
          />
          <Rating
            defaultValue={1}
            precision={0.5}
            onChange={onChangeRating}
            size="medium"
          />
          <Button
            type="submit"
            className="!px-4 !mt-4 !mb-6 !self-start !py-2 !bg-primary !text-white !transition hover:!bg-gray-900"
          >
            {isLoading ? (
              <CircularProgress color="white" size={22} />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
      <div className="w-full proReviewContainer">
        <h2 className="text-lg font-semibold mb-6">Customer Reviews</h2>
        <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden">
          {proReview?.length !== 0
            ? [...proReview].reverse().map((review) => (
                <div key={review._id} className="review w-full mb-3">
                  <article className="border border-gray-200 p-5 rounded-md">
                    <div className="flex items-center mb-4">
                      <img
                        className="w-10 h-10 me-4 rounded-full"
                        src={review?.image}
                        alt=""
                      />
                      <div className="font-medium text-black/80">
                        <p>{review?.userName}</p>
                      </div>
                    </div>
                    <div className="mb-3 text-sm text-gray-800">
                      <p className="mb-2">
                        <time dateTime={review.createdAt}>
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </time>
                      </p>
                      <Rating
                        name="size-small"
                        value={Number(review?.rating)}
                        readOnly
                        precision={0.5}
                        size="small"
                      />
                    </div>
                    <p class="mb-2 text-gray-800">{review?.review}</p>
                  </article>
                </div>
              ))
            : "No Reviews "}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
