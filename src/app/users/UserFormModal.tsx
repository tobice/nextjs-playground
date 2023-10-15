import User from "@/app/common/users/User";
import React, {forwardRef, MutableRefObject} from "react";

interface Props {
    onSubmit: (user: User) => Promise<void>;
}

function UserFormModal(
    { onSubmit }: Props,
    ref: MutableRefObject<HTMLDialogElement | null>
) {
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        await onSubmit({
            firstName: formData.get("firstName")!.toString(),
            lastName: formData.get("lastName")!.toString(),
            email: formData.get("email")!.toString()
        });

        ref.current?.close()
    }

    function Input({ name, label }: { name: String, label: String}) {
        return <div className="form-control w-full">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input type="text"
                   name={name}
                   placeholder="Type here"
                   className="input input-bordered w-full" />
        </div>
    }

    return (
        <dialog ref={ref} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Add user</h3>
                <form className="w-full" onSubmit={handleSubmit}>
                    <Input name="firstName" label={"First name"} />
                    <Input name="lastName" label={"Last name"} />
                    <Input name="email" label={"Email"} />
                    <button type="submit"
                            className="btn btn-primary w-full mt-6">Add user</button>
                </form>
            </div>
        </dialog>
    );
}

export default forwardRef(UserFormModal)
