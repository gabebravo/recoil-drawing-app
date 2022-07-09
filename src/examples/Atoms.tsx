import {atom, useSetRecoilState, useRecoilValue} from 'recoil'
import {Box, Button, Flex, FormControl, FormLabel, Switch} from '@chakra-ui/react'

// common usecase : same as useState in React
// const [theme, setTheme] = useRecoilState(themeAtom)
const themeAtom = atom({
    key: 'theme', // key names have to be unique
    default: 'light',
})

const ThemeToggle = () => {
    const setTheme = useSetRecoilState(themeAtom) // useSetRecoilState just for setting the value
    return (
        <div>
            <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                    Theme Toggle
                </FormLabel>
                <Switch
                    id="email-alerts"
                    onChange={() => setTheme((prevTheme: string) => (prevTheme === 'light' ? 'dark' : 'light'))}
                />
            </FormControl>
        </div>
    )
}

const UiButton = () => {
    const theme = useRecoilValue(themeAtom) // useRecoilValue just for getting the value
    console.log('theme', theme)
    return (
        <div>
            <Button colorScheme={theme === 'light' ? 'blue' : 'gray'} color={theme === 'light' ? 'white' : 'black'}>
                Button
            </Button>
        </div>
    )
}

const Atoms = () => {
    return (
        <Flex flexDirection="column" alignItems="center" marginTop="10vh">
            <Box m={5}>
                <ThemeToggle />
            </Box>
            <Box m={5}>
                <UiButton />
            </Box>
        </Flex>
    )
}

export default Atoms
