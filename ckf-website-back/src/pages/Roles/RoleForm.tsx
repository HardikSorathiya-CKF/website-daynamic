import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import PermissionSelect from "../../components/PermissionSelect/PermissionSelect";
import { createRole, getPermissions, updateRole } from "../../services/roleService";
import { getApiMessage, getApiFieldError } from "../../utils/apiError";
import type { PermissionGroup, Role, RolePayload } from "../../types/role";

type RoleFormValues = {
  name: string;
  key: string;
  permissions: string[];
  isActive: boolean;
};

type RoleFormProps = {
  role?: Role | null;
  onSuccess: () => void;
  onCancel: () => void;
};

const toKey = (name: string) =>
  name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");

function RoleForm({ role, onSuccess, onCancel }: RoleFormProps) {
  const isEdit = !!role;
  const [loading, setLoading] = useState(false);
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([]);
  const [apiErrors, setApiErrors] = useState<Record<string, string | undefined>>({});

  const { register, handleSubmit, watch, setValue } = useForm<RoleFormValues>({
    defaultValues: {
      name: role?.name || "",
      key: role?.key || "",
      permissions: role?.permissions || [],
      isActive: role?.isActive !== false,
    },
  });

  const permissions = watch("permissions");

  useEffect(() => {
    let active = true;

    getPermissions()
      .then((groups) => {
        if (active) setPermissionGroups(groups);
      })
      .catch((error) => {
        toast.error(getApiMessage(error));
      })
      .finally(() => {
        if (active) setLoadingPermissions(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const onSubmit = async (data: RoleFormValues) => {
    try {
      setLoading(true);
      setApiErrors({});

      const payload: RolePayload = {
        name: data.name,
        key: data.key || toKey(data.name),
        permissions: data.permissions || [],
        isActive: data.isActive,
      };

      const result = isEdit && role
        ? await updateRole(role._id || role.id || "", payload)
        : await createRole(payload);

      toast.success(
        result.message || (isEdit ? "Role updated successfully." : "Role created successfully.")
      );
      onSuccess();
    } catch (error) {
      toast.error(getApiMessage(error));
      setApiErrors({
        name: getApiFieldError(error, "name"),
        key: getApiFieldError(error, "key"),
        permissions: getApiFieldError(error, "permissions"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      title={isEdit ? "Edit Role" : "Create Role"}
      subtitle={
        isEdit
          ? "Update role details and permissions"
          : "Add a role and select its permissions"
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Name"
        placeholder="Enter role name"
        error={apiErrors.name}
        {...register("name")}
      />

      <Input
        label="Key"
        placeholder="superadmin"
        error={apiErrors.key}
        {...register("key")}
      />

      <PermissionSelect
        groups={permissionGroups}
        value={permissions}
        loading={loadingPermissions}
        error={apiErrors.permissions}
        onChange={(next) => setValue("permissions", next)}
      />

      <div className="mb-3">
        <Checkbox label="Active" {...register("isActive")} />
      </div>

      <div className="ckf-form__actions">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading} disabled={loadingPermissions}>
          {isEdit ? "Save Changes" : "Create Role"}
        </Button>
      </div>
    </Form>
  );
}

export default RoleForm;
