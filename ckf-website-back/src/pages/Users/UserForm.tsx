import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import { createUser, updateUser } from "../../services/userService";
import { getApiMessage, getApiFieldError } from "../../utils/apiError";
import type { AdminRole } from "../../types/auth";
import type { User, UserPayload } from "../../types/user";

const roles: AdminRole[] = [
  "superadmin",
  "admin",
  "developer",
  "marketer",
  "editor",
  "viewer",
];

type UserFormValues = {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  avatar: string;
  isActive: boolean;
};

type UserFormProps = {
  user?: User | null;
  onSuccess: () => void;
  onCancel: () => void;
};

function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const isEdit = !!user;
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState<Record<string, string | undefined>>({});

  const { register, handleSubmit } = useForm<UserFormValues>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      role: user?.role || "admin",
      phone: user?.phone || "",
      avatar: user?.avatar || "",
      isActive: user?.isActive !== false,
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);
      setApiErrors({});

      const payload: UserPayload = {
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone,
        avatar: data.avatar,
        isActive: data.isActive,
      };

      if (data.password) {
        payload.password = data.password;
      }

      let result;
      if (isEdit && user) {
        result = await updateUser(user._id || user.id || "", payload);
      } else {
        result = await createUser({ ...payload, password: data.password });
      }

      toast.success(
        result.message || (isEdit ? "User updated successfully." : "User created successfully.")
      );
      onSuccess();
    } catch (error) {
      toast.error(getApiMessage(error));
      setApiErrors({
        name: getApiFieldError(error, "name"),
        email: getApiFieldError(error, "email"),
        password: getApiFieldError(error, "password"),
        role: getApiFieldError(error, "role"),
        phone: getApiFieldError(error, "phone"),
        avatar: getApiFieldError(error, "avatar"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      title={isEdit ? "Edit User" : "Create User"}
      subtitle={
        isEdit
          ? "Update this user details"
          : "Add a new user to the admin panel"
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Name"
        placeholder="Enter name"
        error={apiErrors.name}
        {...register("name")}
      />

      <Input
        label="Email"
        type="email"
        placeholder="user@example.com"
        error={apiErrors.email}
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder={isEdit ? "Leave blank to keep current" : "Enter password"}
        error={apiErrors.password}
        {...register("password")}
      />

      <Select label="Role" error={apiErrors.role} {...register("role")}>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </Select>

      <Input
        label="Phone"
        type="tel"
        placeholder="Enter phone"
        error={apiErrors.phone}
        {...register("phone")}
      />

      <Input
        label="Avatar"
        placeholder="Avatar URL"
        error={apiErrors.avatar}
        {...register("avatar")}
      />

      <div className="mb-3">
        <Checkbox label="Active" {...register("isActive")} />
      </div>

      <div className="ckf-form__actions">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {isEdit ? "Save Changes" : "Create User"}
        </Button>
      </div>
    </Form>
  );
}

export default UserForm;
