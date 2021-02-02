import React from 'react'

export default function Checkbox(props) {
    return (<div class="w-full my-4">
        <label for="file" class="tracking-wide text-gray-700 text-md mb-2">{props.children}</label>
        <input class="mb-2" type="file" name={props.name} id={props.id || props.name} />
    </div>);
}
