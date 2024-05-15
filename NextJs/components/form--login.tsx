import * as React from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import loginStyles from "/styles/login.css/login.module.scss";
import { log } from "console";

interface FormLoginProps extends React.HTMLProps<HTMLFormElement> {}

interface FormStatus {
  status: "success" | "error" | "fetching"
  message?: string
}

export function FormLogin({ className, ...props }: FormLoginProps) {
  const [formStatus, setFormStatus] = React.useState<FormStatus>(null)
  const router = useRouter()

  React.useEffect(() => {
    if (router.query.error === "CredentialsSignin") {
      return setFormStatus({
        status: "error",
        message: ("unrecognized-username-or-password-please-try-again"),
      })
    }
    return setFormStatus(null)
  }, [router])

  const onSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    setFormStatus({ status: "fetching" })

    await signIn("credentials", {
      username: data.get("username"),
      password: data.get("password"),
    })

    return setFormStatus({
      status: "success",
    })
  }

  return (
    <form
      onSubmit={onSubmit}
      {...props}
      className={loginStyles.Form}
    >
      {formStatus?.message && (
        <p className={loginStyles.errorForm}
        >
          Unrecognized username or password please try again
        </p>
      )}
      <div className="grid gap-2">
        <label htmlFor="username" className={loginStyles.Label}>
          {("username")} <span className="text-sm text-red-500">*</span>
        </label>
        <input
          id="username"
          name="username"
          maxLength={255}
          required
          className={loginStyles.Field}
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="password" className={loginStyles.Label}>
          {("password")} <span className="text-sm text-red-500">*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className={loginStyles.Field}        />
      </div>
      <div className={loginStyles.ButtonHolder}>
        <input
          type="submit"
          className={loginStyles.LoginButton}
          disabled={formStatus?.status === "fetching"}
          value={
            formStatus?.status === "fetching" ? ("please-wait") : ("login")
          }
        />
      </div>
    </form>
  )
}