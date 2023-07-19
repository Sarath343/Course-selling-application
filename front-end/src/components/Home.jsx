import { Button } from "@mui/material"

function Home() {
    return (
        <div>Home <br />
            <Button size={"large"}
                variant="contained" onClick={() => {
                    window.location = '/Signup'
                }}>Sign Up</Button>
            <Button size={"large"}
                variant="contained" onClick={() => {
                    window.location = '/Login'
                }}>Login</Button>

        </div>


    )
}
export default Home