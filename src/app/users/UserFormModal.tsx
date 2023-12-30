import User, {parseUser} from "@/app/common/users/User";
import React, {ForwardedRef, forwardRef, MutableRefObject, useState} from "react";
import Input from "@/app/common/forms/Input";

interface FormData {
    firstName: string,
    lastName: string,
    email: string
}

const EMPTY_FORM_DATA: FormData = {
    firstName: "",
    lastName: "",
    email: ""
}

interface UserModalProps {
    onSubmit: (user: User) => Promise<void>;
}

function UserFormModal(
    { onSubmit }: UserModalProps,
    ref: ForwardedRef<HTMLDialogElement>
) {
    const [formData, setFormData] = useState<FormData>(EMPTY_FORM_DATA)
    const [shouldShowErrors, setShouldShowErrors] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const { user, error } = parseUser(formData)

    function getErrorMessage(name: string): string | null {
        if (!shouldShowErrors) {
            return null
        }

        return error?.issues.find(issue => issue.path[0] == name)?.message || null
    }

    function reset() {
        setFormData(EMPTY_FORM_DATA)
        setShouldShowErrors(false)
        setIsSubmitting(false)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (error) {
            setShouldShowErrors(true)
        } else {
            setIsSubmitting(true)
            // TODO: handle failure
            await onSubmit(user!!);
            reset()

            if (ref && "current" in ref) {
                ref.current?.close();
            }
        }
    }

    return (
        <dialog ref={ref} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Add user</h3>
                <form className="w-full" onSubmit={handleSubmit}>
                    <fieldset disabled={isSubmitting}>
                        <Input
                            label="First name"
                            value={formData.firstName}
                            onChange={(firstName) => setFormData({ ...formData, firstName })}
                            error={getErrorMessage("firstName")}
                        />
                        <Input
                            label="Last name"
                            value={formData.lastName}
                            onChange={(lastName) => setFormData({ ...formData, lastName })}
                            error={getErrorMessage("lastName")}
                        />
                        <Input
                            label="Email"
                            value={formData.email}
                            onChange={(email) => setFormData({ ...formData, email })}
                            error={getErrorMessage("email")}
                        />

                        <button type="submit"
                                className="btn btn-primary w-full mt-6">
                            {isSubmitting && <span className="loading loading-spinner loading-xs"></span>}
                            Add user
                        </button>
                    </fieldset>
                </form>
            </div>
        </dialog>
    );
}

export default forwardRef(UserFormModal)
