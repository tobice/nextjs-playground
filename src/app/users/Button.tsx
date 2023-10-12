'use client'

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Button() {
    const { data, error } = useSWR('/api/users', fetcher);
    const counter = data ? data.counter : "?"

    async function callServer() {
        fetch("/api/users", { method: "POST" })
    }

    return <button onClick={callServer}>Click to increase the counter ({counter})</button>
}