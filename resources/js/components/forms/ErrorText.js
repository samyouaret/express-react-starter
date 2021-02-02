import React from 'react'

export default function ErrorText(props) {
    return (<p class="text-red-500 text-xs italic" id="name-error" {...props}>{props.children}</p>);
}