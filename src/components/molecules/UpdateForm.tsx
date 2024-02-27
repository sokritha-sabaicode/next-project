import React, {
  useState,
  useRef,
  FormEventHandler,
  ChangeEvent,
  useEffect,
} from "react";
import { InputFile, InputText, Button } from "../atoms";
import * as Yup from "yup";
import { UserValidateSchema } from "@/schema/UserSchema";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface UpdateFormProps {
  user: User;
  updateUser: (updatedUser: User) => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ user, updateUser }) => {
  const [updateValue, setUpdateValue] = useState<User>({ ...user });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUpdateValue({ ...user }); 
  }, [user]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await UserValidateSchema.validate(updateValue, { abortEarly: false });
      updateUser({ ...updateValue }); 
      setErrors({}); 
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
    setUpdateValue({ ...updateValue, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files && event.target.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setUpdateValue({ ...updateValue, image: imageUrl });
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
            value={updateValue.name}
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
            value={updateValue.email}
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
              Update
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export { UpdateForm };
