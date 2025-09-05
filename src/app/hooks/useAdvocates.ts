import { useEffect, useState } from "react";
import { Advocate } from "../types/advocate";

export const useAdvocates = () => {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);

    useEffect(() => {
        fetch("/api/advocates").then((response) => {
            response.json().then((jsonResponse) => {
                setAdvocates(jsonResponse.data);
            });
        });
    }, []);

    return advocates
}