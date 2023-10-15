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
        <form className="join" onSubmit={handleSubmit}>
            <input
                name="search"
                type="text"
                placeholder="Search"
                className="input input-bordered join-item"
            />
            <button type="submit"
                    className="btn join-item">Search</button>
        </form>
    );
};

export default SearchForm