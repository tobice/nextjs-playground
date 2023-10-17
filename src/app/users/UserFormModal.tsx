import User, {parseUser} from "@/app/common/users/User";
import React, {forwardRef, MutableRefObject, useState} from "react";
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
    ref: MutableRefObject<HTMLDialogElement | null>
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
            await onSubmit(user);
            reset()
            ref.current?.close()
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
                        <Input type="text"
                               label="First name"
                               value={formData.firstName}
                               onChange={(firstName) => setFormData({ ...formData, firstName })}
                               error={getErrorMessage("firstName")}
                               placeholder="Type here"
                               className="input input-bordered w-full" />
                        <Input type="text"
                               label="Last name"
                               value={formData.lastName}
                               onChange={(lastName) => setFormData({ ...formData, lastName })}
                               error={getErrorMessage("lastName")}
                               placeholder="Type here"
                               className="input input-bordered w-full" />
                        <Input type="text"
                               label="Email"
                               value={formData.email}
                               onChange={(email) => setFormData({ ...formData, email })}
                               error={getErrorMessage("email")}
                               placeholder="Type here"
                               className="input input-bordered w-full" />

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
