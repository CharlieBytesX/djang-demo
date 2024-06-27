import { authManager } from "@/lib/auth";
import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormContent {
  title: string;
  description: string;
  image: string | undefined;
  price: number;
  contact_number: string;
  imageInput: string;
}

function emptyFormContent(): FormContent {
  return {
    title: "",
    description: "",
    image: "",
    imageInput: "",
    contact_number: "",
    price: 0,
  };
}

export const useCarLogic = () => {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccesDialog, setShowSuccessDialog] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState(emptyFormContent);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadCarInfo = async (id?: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/list_car_post/${id}`);
      if (response.ok) {
        const jsonBody = await response.json();
        setContent({
          title: jsonBody.title,
          description: jsonBody.description,
          contact_number: jsonBody.contact_number,
          price: jsonBody.price,
          image: jsonBody.car_image,
          imageInput: "",
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent({ ...content, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeTitle = (value: string) => {
    setContent({ ...content, title: value });
  };

  const handleChangeContactNumber = (value: string) => {
    const regex = /^[0-9]+$/;

    if (!regex.test(value) && value.length !== 0) {
      return;
    }
    if (value.length > 8) {
      return;
    }

    setContent({ ...content, contact_number: value });
  };

  const handleChangePrice = (value: number) => {
    setContent({ ...content, price: value });
  };

  const handleChangeDescription = (value: string) => {
    setContent({ ...content, description: value });
  };

  const handleCreateNewPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(
        "/api/create_car_post",
        authManager.addAuthToRequest({
          method: "POST",
          body: formData,
        }),
      );

      if (response.ok) {
        setLoading(false);
        setError("");
        setShowSuccessDialog(true);
      } else {
        setLoading(false);
        setError("Error creating post");
      }
    } catch (error) {
      setLoading(false);
      setError("Error creating post");
    }
  };

  const handleEditPost = async (e: FormEvent<HTMLFormElement>, id?: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(
        `/api/update_car_post/${id}`,
        authManager.addAuthToRequest({
          method: "POST",
          body: formData,
        }),
      );

      if (response.ok) {
        setLoading(false);
        setError("");
        setShowSuccessDialog(true);
      } else {
        setLoading(false);
        setError("Error updating post");
      }
    } catch (error) {
      setLoading(false);
      setError("Error updating post");
    }
  };

  function createNewCarPost() {
    setContent(emptyFormContent());
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setShowSuccessDialog(false);
  }

  return {
    setShowSuccessDialog,
    fileInputRef,
    createNewCarPost,
    navigator,
    handleCreateNewPost,
    handleImageChange,
    showSuccesDialog,
    loading,
    error,
    content,
    handleChangeTitle,
    handleChangeDescription,
    handleChangePrice,
    handleChangeContactNumber,
    handleEditPost,
    loadCarInfo,
  };
};
