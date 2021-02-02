import React from 'react'

export default function Checkbox(props) {
    return (<div class="w-full my-2">
        <label name={props.id || props.name} class="tracking-wide text-gray-700 text-sm mb-2">
            <input type="checkbox" name={props.name} id={props.name}  {...props} class="align-middle" />
            <span class="align-middle">{props.children}</span></label>
    </div>);
}
