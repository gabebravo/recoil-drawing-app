import React from 'react'
import {atomFamily, useRecoilState} from 'recoil'
import shortid from 'shortid'

type Row = {id: string; completed: boolean}
const rowState = atomFamily<Row, string>({
    key: 'row',
    default: {
        id: shortid.generate(),
        completed: false,
    },
})

const Row = () => {
    return <div>AtomFamily</div>
}

const RowButton = () => {
    return <div>AtomFamily</div>
}

const AtomFamily = () => {
    const rowId = shortid.generate()
    const [element, setElement] = useRecoilState(rowState(rowId))
    console.log('element', element)
    return (
        <div>
            <h1>Hello</h1>
            <button style={{backgroundColor: element.completed ? 'green' : 'red'}}>{element.id}</button>
        </div>
    )
}

export default AtomFamily
