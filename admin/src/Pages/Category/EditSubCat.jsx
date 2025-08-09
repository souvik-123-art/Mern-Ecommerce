import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";
import toast from "react-hot-toast";
import { setCatData } from "../../redux/slices/categoryDataSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const EditSubCat = (props) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectVal, setSelectVal] = useState("");
  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  useEffect(() => {
    formFields.name = props?.name;
    formFields.parentCatName = props?.selectedCatName;
    formFields.parentId = props?.selectedCat;
    setSelectVal(props?.selectedCat);
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };
  const handleChange = (e) => {
    setSelectVal(e.target.value);
    formFields.parentId = e.target.value;
  };
  const deleteCat = (id)=>{
    deleteData(`/api/category/deleteCategory/${id}`).then((res)=>{
      fetchDataFromApi("/api/category").then((res) => {
        dispatch(setCatData(res?.data));
      });
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.name === "") {
      toast.error("please add sub category name");
      setIsLoading(false);
      return false;
    }
    editData(`/api/category/updateCategory/${props?.id}`, formFields, {
      credentials: true,
    }).then((res) => {
      try {
        if (!res?.data.error) {
          toast.success(res.data.message);
          setIsLoading(false);
          fetchDataFromApi("/api/category").then((res) => {
            dispatch(setCatData(res?.data));
          });
        } else {
          toast.error(res.data.message);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    });
  };
  return (
    <form
      className="w-full flex items-center gap-3 px-4"
      onSubmit={handleSubmit}
    >
      {editMode && (
        <>
          <div className="flex items-center justify-between py-2 gap-4">
            <div className="w-[150px]">
              <Select
                style={{ zoom: "75%" }}
                className="w-full"
                size="small"
                value={selectVal}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {props?.catData?.length !== 0 &&
                  props?.catData?.map((cat) => (
                    <MenuItem
                      value={cat?._id}
                      key={cat.name}
                      onClick={() => {
                        formFields.parentCatName = cat?.name;
                      }}
                    >
                      {cat?.name}
                    </MenuItem>
                  ))}
              </Select>
            </div>
            <input
              type="text"
              className="w-full h-[30px] border border-black/30 focus:outline-none focus:border-black/50 rounded-sm p-3 text-sm"
              name="name"
              value={formFields?.name}
              onChange={onChangeInput}
            />
            <div className="flex items-center gap-2">
              <Button
                size="small"
                className="btn-blue"
                variant="contained"
                type="submit"
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inerhit" />
                ) : (
                  "Edit"
                )}
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}

      {!editMode && (
        <>
          <span className="font-[500] text-[16px]">{props.name}</span>
          <div className="flex items-center ml-auto gap-2">
            <Button
              className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !text-lg !ml-auto"
              onClick={() => {
                setEditMode(true);
                setSelectVal(props.selectedCat);
              }}
            >
              <FiEdit2 />
            </Button>
            <Button
              className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !text-lg !ml-auto"
              onClick={() => deleteCat(props?.id)}
            >
              <RiDeleteBin6Line />
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default EditSubCat;
