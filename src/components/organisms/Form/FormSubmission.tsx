import React, { useState, useRef, FormEventHandler, ChangeEvent } from "react";
import { InputFile, InputText, Button } from "../../atoms";
import * as Yup from "yup";
import { UserValidateSchema } from "@/schema/UserSchema";
import { UserForm } from "@/@types/user";
import { useUser } from "@/contexts/UserContext";
import { useModal } from "@/contexts/ModalContext";

const DEFAULT_FORM_VALUE = {
  name: "",
  email: "",
  image: "",
};

const FormSubmission = () => {
  const { selectCard, selectCardInfo, updateUser, addNewUser } = useUser();
  const {setIsOpen} = useModal()

  // If selectCard has value, means the form is update. Else: form is Add
  const [formData, setFormData] = useState<UserForm>(
    !selectCard ? DEFAULT_FORM_VALUE : (selectCardInfo as UserForm)
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Access File Element
  const inputFileRef = useRef<HTMLInputElement>(null);

  // Form Submission Action (Update or Create)
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // TODO:
    // 1. Validate Form Data
    // 2. Check If There is Card Selected.
    //    If Yes: Update The User, Else: Add New User
    // 3. Clear Errors After Successful Submission
    // 4. Close Modal

    try {
      await UserValidateSchema.validate(formData, { abortEarly: false });

      if (selectCard){
        updateUser(selectCardInfo?.id as string, formData)
      }else {
        addNewUser(formData)
      }
      
      // Clear errors after successful submission
      setErrors({}); 
      setIsOpen(false)
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        error.inner.forEach((e) => {
          if (e.path) {
            newErrors[e.path] = e.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files && event.target.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <InputText
            size="md"
            placeholder="Username"
            type="text"
            name="name"
            value={formData.name}
            onChange={onChangeInput}
          />
          {errors.name && (
            <p className="-mt-3" style={{ color: "red" }}>
              {errors.name}
            </p>
          )}
          <InputText
            size="md"
            placeholder="example@gmail.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeInput}
          />
          {errors.email && (
            <p className="-mt-3 mb-4" style={{ color: "red" }}>
              {errors.email}
            </p>
          )}
          <InputFile
            size="md"
            type="file"
            ref={inputFileRef}
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
          <div className="flex flex-col">
            <Button type="submit" className="mt-2" size="md" color="primary">
              {
                selectCard ? "Update" : "Create"
              }
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export { FormSubmission };
