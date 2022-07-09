import {useRecoilState, atomFamily} from 'recoil'
import {selectedElementState} from '../../Canvas'
import {Drag} from '../Drag'
import {RectangleContainer} from './RectangleContainer'
import {RectangleInner} from './RectangleInner'

export type ElementStyle = {
    position: {top: number; left: number}
    size: {width: number; height: number}
}

export type Element = {style: ElementStyle}

/*  https://recoiljs.org/docs/api-reference/utils/atomFamily
    An Atom Family represents a collection of atoms. 
    When you call atomFamily() it will return a function which provides the RecoilState atom 
    based on the parameters you pass in.
*/

// atomFamily = Returns a function that returns a writeable RecoilState atom.
// used for creating multiple atoms that are the same atom type
// when called on line 29, the dynamic id becomes like a compound key
const elmentState = atomFamily<Element, number>({
    key: 'element',
    default: {
        style: {
            position: {top: 0, left: 0},
            size: {width: 50, height: 50},
        },
    },
})

export const Rectangle = ({id}: {id: number}) => {
    const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState)
    const [element, setElement] = useRecoilState(elmentState(id)) // the id is the parameter here
    // The atomFamily() essentially provides a map from the parameter to an atom.
    // You only need to provide a single key for the atom family and it will generate a unique key for each underlying atom.
    // These atom keys can be used for persistence, and so must be stable across application executions.

    return (
        <Drag
            position={element.style.position}
            onDrag={(position) => {
                setElement({
                    style: {
                        ...element.style,
                        position,
                    },
                })
            }}
        >
            <div>
                <RectangleContainer
                    position={element.style.position}
                    size={element.style.size}
                    onSelect={() => {
                        setSelectedElement(id)
                    }}
                >
                    <RectangleInner selected={id === selectedElement} />
                </RectangleContainer>
            </div>
        </Drag>
    )
}
