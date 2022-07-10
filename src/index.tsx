import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Canvas from './Canvas'
import Atoms from './examples/Atoms'
import Selectors from './examples/Selectors'
import RecoilizeDebugger from 'recoilize'
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {RecoilRoot} from 'recoil'

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <RecoilizeDebugger />
            <ChakraProvider>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Canvas />
                        </Route>
                        <Route exact path="/examples/atoms">
                            <Atoms />
                        </Route>
                        <Route exact path="/examples/selectors">
                            <Selectors />
                        </Route>
                    </Switch>
                </Router>
            </ChakraProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root'),
)
