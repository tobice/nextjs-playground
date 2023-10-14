import {usePathname, useSearchParams} from "next/navigation";

export default function useUpdateHrefQuery():
        (params: { [key: string]: string }) => string {
    const pathname: String = usePathname()
    const searchParams = useSearchParams()

    return params => {
        const newSearchParams = new URLSearchParams(searchParams);

        for (const key in params) {
            if (params[key] != null && params[key] != "") {
                newSearchParams.set(key, params[key])
            } else {
                newSearchParams.delete(key)
            }
        }

        return pathname + (newSearchParams.size > 0 ? `?${newSearchParams}` : "")
    }
}
