import React from "react";

interface Props {
    onSubmit: (search: string) => void;
}

const SearchForm = ({ onSubmit }: Props) => {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        onSubmit(formData.get("search")!.toString() || "");
    }

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex space-x-2 items-center">
                <input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Search"
                    className="flex-1 p-2 border rounded-md"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Search</button>
            </div>
        </form>
    );
};

export default SearchForm