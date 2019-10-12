import React from "react"

export default function trim(str = "", maxLength = 100) {
    if (str.length <= maxLength) {
        return str
    } else {
        let result = str.substring(0, maxLength)
        let ignored = " .,-_!?=,+@*'/()=1234567890—[]\""
        let i = 0

        while (ignored.split("").includes(result.slice(-1)) && i < 10) {
            result = result.substring(0, result.length - 1)
            i++
        }

        return <>{result}&nbsp;&hellip;</>
    }
}