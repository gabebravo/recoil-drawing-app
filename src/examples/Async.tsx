import {Container, Heading, Text} from '@chakra-ui/layout'
import {Select} from '@chakra-ui/select'
import {Suspense, useState} from 'react'
import {selectorFamily, useRecoilValue} from 'recoil'

// Because Recoil caches state and tracks it over time, even when the user picks a different
// option from the dropdown, if it was already picked, the selector won't run the logic in the function again
// the drawback is that the data can get stale since it won't make the api call again (but there are ways around that)
const userState = selectorFamily({
    // selectorFamily is used here to allow a unique set of params to be passed each time
    key: 'user',
    get: (userId: number) => async () => {
        const userData = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((res) => res.json())
        return userData
    },
})

// NOTE : the component using the recoil hook should be separate and be wrapped in <Suspense>
const UserData = ({userId}: {userId: number}) => {
    // because Recoil suspends, this user value will always be there at render time
    // it doesn't have a load state, etc. just uses the Suspense fallback to do that
    const user = useRecoilValue(userState(userId)) // NOTE : param must be passed to the selectorFamily
    if (!user) return null // NOTE : this condition is in case there is no user at render time

    return (
        <div>
            <Heading as="h2" size="md" mb={1}>
                User data:
            </Heading>
            <Text>
                <b>Name:</b> {user.name}
            </Text>
            <Text>
                <b>Phone:</b> {user.phone}
            </Text>
        </div>
    )
}

const Async = () => {
    const [userId, setUserId] = useState<undefined | number>(undefined)

    return (
        <Container py={10}>
            <Heading as="h1" mb={4}>
                View Profile
            </Heading>
            <Heading as="h2" size="md" mb={1}>
                Choose a user:
            </Heading>
            <Select
                placeholder="Choose a user"
                mb={4}
                value={userId}
                onChange={(event) => {
                    const value = event.target.value
                    setUserId(value ? parseInt(value) : undefined)
                }}
            >
                <option value="1">User 1</option>
                <option value="2">User 2</option>
                <option value="3">User 3</option>
            </Select>
            {userId !== undefined && (
                // NOTE : this is wrapped in suspense, so only UserData loads.
                <Suspense fallback={<div>Loading...</div>}>
                    <UserData userId={userId} />
                </Suspense>
            )}
        </Container>
    )
}

export default Async
