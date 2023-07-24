import LoginForm from "../components/authorization/LoginForm";

function LoginPage(){
    return(
        <div className="h-screen flex items-center justify-center">
            <div className="mb-80 card w-96 glass hover:scale-100 flex flex-col justify-center items-center">
                <p>Please fill out the fields to sign in</p>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage;