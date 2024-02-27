import React, { useState, useRef, FormEventHandler, ChangeEvent } from "react";
import { InputFile, InputText, Button } from "../atoms";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { UserValidateSchema } from "@/schema/UserSchema";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface AddFormProps {
  user: User[];
  setUser: React.Dispatch<React.SetStateAction<User[]>>;
}

const AddForm: React.FC<AddFormProps> = ({ user, setUser }) => {
  const [enterValue, setEnterValue] = useState<User>({
    id: "",
    name: "",
    email: "",
    image: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await UserValidateSchema.validate(enterValue, { abortEarly: false });
      const newUser = { ...enterValue, id: uuidv4() };
      console.log(newUser);
      setUser((prevUsers) => [...prevUsers, newUser]);
      setEnterValue({
        id: "",
        name: "",
        email: "",
        image: "",
      });
      
      e.currentTarget.reset();
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
      setErrors({}); // Clear errors after successful submission
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
    setEnterValue({ ...enterValue, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files && event.target.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setEnterValue({ ...enterValue, image: imageUrl });
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
            value={enterValue.name}
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
            value={enterValue.email}
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
              Create
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export { AddForm };
