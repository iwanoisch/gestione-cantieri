import {FC} from "react";
import {Props} from "./pageTitle.type.ts";

export const PageTitle: FC<Props> = ({title, subtitle}) => {
    return <>
        <h1 className="text-4xl/7 mb-3 font-semibold text-gray-900">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
            {subtitle}
        </p>
    </>
}
