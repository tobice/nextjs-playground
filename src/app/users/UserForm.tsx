import User from "@/app/common/users/User";
import React from "react";

interface Props {
    onSubmit: (user: User) => void;
}

const UserForm: React.FC<Props> = ({ onSubmit }) => {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        onSubmit({
            firstName: formData.get("firstName")!.toString(),
            lastName: formData.get("lastName")!.toString(),
            email: formData.get("email")!.toString()
        });
    }

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex space-x-2 items-center">
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    className="flex-1 p-2 border rounded-md"
                />
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="flex-1 p-2 border rounded-md"
                />
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="flex-1 p-2 border rounded-md"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create</button>
            </div>
        </form>
    );
};

export default UserForm
