import { useMemo } from "react";

const useReg = (regex) => {
    return useMemo(() => regex, [])
};

export default useReg;
