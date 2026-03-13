import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "", 
  });

  const [error, setError] = useState({});
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isUpdatingPassword} = useSelector(state => state.auth);
  const token = searchParams.get("token");
  


  return <></>;
};

export default ResetPasswordPage;