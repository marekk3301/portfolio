import { useEffect } from "react";

// Sets the browser tab title while the component is mounted
const usePageTitle = (title) => {
    useEffect(() => {
        if (!title) return;
        const previousTitle = document.title;
        document.title = title;
        return () => {
            document.title = previousTitle;
        };
    }, [title]);
};

export default usePageTitle;
