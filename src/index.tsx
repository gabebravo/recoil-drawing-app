import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Canvas from './Canvas'
import Atoms from './examples/Atoms'
import Selectors from './examples/Selectors'
import AtomFamily from './examples/AtomFamily'
import RecoilizeDebugger from 'recoilize'
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import Async from './examples/Async'

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
                        <Route exact path="/examples/atom-family">
                            <AtomFamily />
                        </Route>
                        <Route exact path="/examples/async">
                            {/* A SUSPENSE FALLBACK IS REQUIRED BY RECOIL (recoil suspends during async/await) 
                                when making api calls using the recoil hook in a component */}
                            <Suspense fallback={<div>Loading...</div>}>
                                <Async />
                            </Suspense>
                        </Route>
                    </Switch>
                </Router>
            </ChakraProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root'),
)
