import React from 'react'

export default function Input(props) {
    return (<div class="w-full">
        <label for={props.name}
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{props.label}</label>
        <input type="text" name={props.name} {...props}
            class="border border-gray-300 p-2 mb-2 rounded-sm focus:border-blue-400 text-gray-700 leading-tight transition-all" />
    </div>
    );
}