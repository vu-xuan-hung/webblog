/* eslint-disable no-unused-vars */
import { React, useState } from 'react'
import posts from "../../posts.json";

function List(props) {
    const filteredData = posts.filter((el) => {
        if (props.input === '') {
            return el;
        } else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>{item.t}</li>
            ))}
        </ul>
    )
}

export default List